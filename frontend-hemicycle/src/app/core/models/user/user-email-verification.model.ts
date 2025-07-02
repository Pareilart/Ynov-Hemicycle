/**
 * Modèle UserEmailVerification
 * @interface UserEmailVerification
 *
 * @description
 * Interface représentant un utilisateur avec un code de vérification
 *
 * @version 1.0.0
 *
 * @property {string} email - Email de l'utilisateur
 * @property {string} code - Code de vérification de l'utilisateur
 *
 * @example
 * ```typescript
 * const userEmailVerification: UserEmailVerification = {
 *   email: "contact@valentin-fortin.pro",
 *   code: "123456"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface UserEmailVerification {
  //#region Propriétés
  /**
   * Propriété email
   * @readonly
   *
   * @description
   * Email de l'utilisateur
   *
   * @memberof UserEmailVerification
   * @since 1.0.0
   *
   * @type {string} email
   */
  email: string;

  /**
   * Propriété code
   * @readonly
   *
   * @description
   * Code de vérification de l'utilisateur
   *
   * @memberof UserEmailVerification
   * @since 1.0.0
   *
   * @type {string} code
   */
  code: string;
  //#endregion
}
