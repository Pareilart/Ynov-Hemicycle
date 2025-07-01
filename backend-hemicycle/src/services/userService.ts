import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Role from '../models/Role';
import { IUserCreate } from '../types/interfaces/IUserCreate';
import { IUserDocument } from '../types/interfaces/IUserDocument';
import { UserDto } from '../types/dto/UserDto';
import { RoleEnum } from '../enum/RoleEnum';
import { IUserUpdate } from '../types/interfaces/IUserUpdate';

export class UserService {
  /**
     * Crée un nouvel utilisateur
     * @param userData Les données de l'utilisateur à créer
     * @returns L'utilisateur créé avec ses relations
     * @throws Error si la création échoue
     */
  public static async createUser(userData: IUserCreate): Promise<{
    user: ReturnType<typeof UserDto.toResponse>,
    message: string
  }> {
    try {
      // Vérification des champs requis
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.role) {
        throw new Error('Tous les champs sont requis');
      }

      // Validation du format de l'email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Format d\'email invalide');
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Cet email est déjà utilisé');
      }

      // Vérifier si le rôle existe
      const role = await Role.findById(userData.role);
      if (!role) {
        throw new Error('Le rôle spécifié n\'existe pas');
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Créer le nouvel utilisateur
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });

      // Récupérer l'utilisateur avec ses relations
      const populatedUser = await User.findById(user._id)
        .populate('role')
        .populate('addresses')
        .populate('votingSurvey') as IUserDocument;

      return {
        user: UserDto.toResponse(populatedUser),
        message: 'Utilisateur créé avec succès',
      };
    } catch (error: any) {
      throw new Error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
    }
  }

  /**
     * Met à jour un utilisateur existant
     * @param userId ID de l'utilisateur à mettre à jour
     * @param updateData Données de mise à jour de l'utilisateur
     * @returns L'utilisateur mis à jour avec ses relations
     * @throws Error si la mise à jour échoue
     */
  public static async updateUser(userId: string, updateData: Partial<IUserCreate>): Promise<{
    user: ReturnType<typeof UserDto.toResponse>,
    message: string
  }> {
    try {
      // Récupérer l'utilisateur avec ses relations
      const user = await User.findById(userId)
        .populate('role')
        .populate('addresses')
        .populate('votingSurvey');

      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      // Vérifier si c'est un admin
      if (user.role && (user.role as any).name === RoleEnum.ADMIN) {
        throw new Error('La modification d\'un utilisateur administrateur n\'est pas autorisée');
      }

      // Vérifier l'unicité de l'email si modifié
      if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findOne({ email: updateData.email });
        if (existingUser) {
          throw new Error('Cet email est déjà utilisé par un autre utilisateur');
        }
      }

      // Hasher le mot de passe si fourni
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      // Mettre à jour l'utilisateur
      Object.assign(user, updateData);
      await user.save();

      // Récupérer l'utilisateur mis à jour avec ses relations
      const updatedUser = await User.findById(userId)
        .populate('role')
        .populate('addresses')
        .populate('votingSurvey') as IUserDocument;

      return {
        user: UserDto.toResponse(updatedUser),
        message: 'Utilisateur mis à jour avec succès',
      };
    } catch (error: any) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur: ${error.message}`);
    }
  }

  /**
     * Met à jour le profil d'un utilisateur
     * @param userId ID de l'utilisateur à mettre à jour
     * @param updateData Données de mise à jour
     * @returns L'utilisateur mis à jour
     * @throws Error si la mise à jour échoue
     */
  public static async updateProfile(userId: string, updateData: IUserUpdate): Promise<{
    user: ReturnType<typeof UserDto.toResponse>,
    message: string
  }> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      // Vérifier si l'email est déjà utilisé
      if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findOne({ email: updateData.email });
        if (existingUser) {
          throw new Error('Cet email est déjà utilisé');
        }
      }

      // Hasher le nouveau mot de passe si fourni
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      // Mettre à jour l'utilisateur
      Object.assign(user, updateData);
      await user.save();

      // Récupérer l'utilisateur mis à jour avec ses relations
      const updatedUser = await User.findById(userId)
        .populate('role')
        .populate('addresses')
        .populate('votingSurvey');

      if (!updatedUser) {
        throw new Error('Erreur lors de la récupération de l\'utilisateur mis à jour');
      }

      return {
        user: UserDto.toResponse(updatedUser as IUserDocument),
        message: 'Profil mis à jour avec succès',
      };
    } catch (error) {
      throw error;
    }
  }
}
