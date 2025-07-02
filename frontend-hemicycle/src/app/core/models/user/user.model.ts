import { Timestampable } from "@core/models/timestampable/timestampable.model";
import { Email } from "@core/models/email/email.model";
import { UserRole } from "./user-role.model";

/**
 * Modèle User
 * @interface User
 *
 * @description
 * Représente un utilisateur
 *
 * @version 1.0.0
 *
 * @property {string} id - Identifiant unique de l'utilisateur
 * @property {Email} email - Email de l'utilisateur
 * @property {string} image - Image de l'utilisateur
 * @property {string} firstName - Prénom de l'utilisateur
 * @property {string} lastName - Nom de l'utilisateur
 * @property {string} birthday - Nom de l'utilisateur
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface User extends Timestampable {
  //#region Propriétés
  /**
   * Propriété id
   * @readonly
   *
   * @description
   * Identifiant unique de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {string} id
   */
  readonly id: string;

  /**
   * Propriété email
   * @readonly
   *
   * @description
   * Email de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {Email} email
   */
  readonly email: Email;

  /**
   * Propriété firstname
   * @readonly
   *
   * @description
   * Prénom de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {string} firstname
   */
  readonly firstname: string;

  /**
   * Propriété lastname
   * @readonly
   *
   * @description
   * Nom de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {string} lastname
   */
  readonly lastname: string;

  /**
   * Propriété role
   * @readonly
   *
   * @description
   * Rôle de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {UserRole} role
   */
  readonly role: UserRole;

  /**
   * Propriété birthday
   * @readonly
   *
   * @description
   * Date de naissance de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {Date} birthday
   */
  readonly birthday: Date;

  /**
   * Propriété hasOnBoarding
   * @readonly
   *
   * @description
   * Indique si l'utilisateur a terminé
   * son onboarding
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {boolean} hasOnBoarding
   */
  readonly hasOnBoarding: boolean;

  /**
   * Propriété twoFactorEnabled
   * @readonly
   *
   * @description
   * Indique si l'utilisateur a activé
   * le 2FA
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {boolean} twoFactorEnabled
   */
  readonly twoFactorEnabled: boolean;
  //#endregion
};
