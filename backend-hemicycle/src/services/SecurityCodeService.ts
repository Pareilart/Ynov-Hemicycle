import { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import SecurityCode from '../models/SecurityCode';
import { ISecurityCode } from '../types/interfaces/ISecurityCode';
import { MaxAttemptsExceededError } from '../types/errors/MaxAttemptsExceededError';

export class SecurityCodeService {
  private static readonly MAX_ATTEMPTS = 5;

  private static readonly SALT_ROUNDS = 10;

  private static generateRandomCode(): string {
    // Génère un code à 6 chiffres sous forme de chaîne de caractères
    return Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
  }

  private static getExpirationDate(minutes: number = 10): Date {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + minutes);
    return expirationDate;
  }

  /**
   * Crée un code de sécurité pour une entité donnée
   * @param entity L'entité pour laquelle créer le code
   * @param entityModel Le modèle Mongoose de l'entité
   * @param expirationMinutes Durée de validité du code en minutes (par défaut 10 minutes)
   * @returns Le code de sécurité créé avec le code en clair pour l'envoi par email
   */
  public static async createSecurityCode<T extends Document>(
    entity: T,
    entityModel: Model<T>,
    expirationMinutes?: number,
  ): Promise<ISecurityCode & { plainCode: string }> {
    // Supprime tout code existant pour cette entité
    await SecurityCode.deleteMany({
      entityId: entity._id,
      entityType: entityModel.modelName,
    });

    const plainCode = this.generateRandomCode();
    const hashedCode = await bcrypt.hash(plainCode, this.SALT_ROUNDS);

    // Crée un nouveau code de sécurité
    const securityCode = new SecurityCode({
      code: hashedCode,
      attempts: 0,
      expireAt: this.getExpirationDate(expirationMinutes),
      entityId: entity._id,
      entityType: entityModel.modelName,
    });

    const savedCode = await securityCode.save();
    // On retourne le code en clair pour pouvoir l'envoyer par email
    return { ...savedCode.toObject(), plainCode };
  }

  /**
   * Vérifie si un code est valide pour une entité donnée
   * @param entity L'entité à vérifier
   * @param entityModel Le modèle Mongoose de l'entité
   * @param code Le code à vérifier
   * @returns true si le code est valide, false sinon
   * @throws MaxAttemptsExceededError si le nombre maximum de tentatives est dépassé
   */
  public static async verifyCode<T extends Document>(
    entity: T,
    entityModel: Model<T>,
    code: string,
  ): Promise<boolean> {
    const securityCode = await SecurityCode.findOne({
      entityId: entity._id,
      entityType: entityModel.modelName,
    });

    if (!securityCode) {
      return false;
    }

    // Vérifie si le nombre maximum de tentatives est atteint
    if (securityCode.attempts >= this.MAX_ATTEMPTS) {
      // Supprime le code si le nombre maximum de tentatives est atteint
      await this.deleteSecurityCode(entity, entityModel);
      throw new MaxAttemptsExceededError();
    }

    // Incrémente le nombre de tentatives
    securityCode.attempts += 1;
    await securityCode.save();

    // Compare le code fourni avec le hash stocké
    return bcrypt.compare(code, securityCode.code);
  }

  /**
   * Supprime un code de sécurité pour une entité donnée
   * @param entity L'entité dont il faut supprimer le code
   * @param entityModel Le modèle Mongoose de l'entité
   */
  public static async deleteSecurityCode<T extends Document>(
    entity: T,
    entityModel: Model<T>,
  ): Promise<void> {
    await SecurityCode.deleteMany({
      entityId: entity._id,
      entityType: entityModel.modelName,
    });
  }

  /**
   * Récupère le code de sécurité actif pour une entité
   * @param entity L'entité dont il faut récupérer le code
   * @param entityModel Le modèle Mongoose de l'entité
   * @returns Le code de sécurité ou null si aucun code n'existe
   */
  public static async getActiveSecurityCode<T extends Document>(
    entity: T,
    entityModel: Model<T>,
  ): Promise<ISecurityCode | null> {
    return SecurityCode.findOne({
      entityId: entity._id,
      entityType: entityModel.modelName,
    });
  }
}
