import { Timestampable } from "@core/models/timestampable/timestampable.model";
import { Uuid } from "@core/models/uuid/uuid.model";
import { Email } from "@core/models/email/email.model";
import { UserGender } from "./user-gender.enum";

/**
 * Modèle User
 * @interface User
 *
 * @description
 * Représente un utilisateur
 *
 * @version 1.0.0
 *
 * @property {Uuid} id - Identifiant unique de l'utilisateur
 * @property {Email} email - Email de l'utilisateur
 * @property {string} image - Image de l'utilisateur
 * @property {string} firstName - Prénom de l'utilisateur
 * @property {string} lastName - Nom de l'utilisateur
 *
 * @example
 * ```typescript
 * const user: User = {
 *   id: "123e4567-e89b-12d3-a456-426614174000",
 *   email: "contact@valentin-fortin.pro",
 *   firstName: "Valentin",
 *   lastName: "FORTIN",
 *   createdAt: new Date(),
 *   updatedAt: new Date(),
 *   deletedAt: undefined
 * };
 * ```
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
   * @type {Uuid} id
   */
  readonly id: Uuid;

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
   * Propriété firstName
   * @readonly
   *
   * @description
   * Prénom de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {string} firstName
   */
  readonly firstName: string;

  /**
   * Propriété lastName
   * @readonly
   *
   * @description
   * Nom de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {string} lastName
   */
  readonly lastName: string;

  /**
   * Propriété gender
   * @readonly
   *
   * @description
   * Genre de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {UserGender} gender
   */
  readonly gender: UserGender;

  /**
   * Propriété city
   * @readonly
   *
   * @description
   * Ville de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {string} city
   */
  readonly city?: string;

  /**
   * Propriété postalCode
   * @readonly
   *
   * @description
   * Code postal de l'utilisateur
   *
   * @memberof User
   * @since 1.0.0
   *
   * @type {string} postalCode
   */
  readonly postalCode?: string;
  //#endregion
};
