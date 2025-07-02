/**
 * Modèle User2FAVerification
 * @interface User2FAVerification
 *
 * @description
 * Interface représentant un utilisateur avec un code 2FA
 *
 * @version 1.0.0
 *
 * @property {string} email - Email de l'utilisateur
 * @property {string} code - Code 2FA de l'utilisateur
 *
 * @example
 * ```typescript
 * const user2fa: User2FAVerification = {
 *   email: "contact@valentin-fortin.pro",
 *   code: "123456"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface User2FAVerification {
  //#region Propriétés
  /**
   * Propriété email
   * @readonly
   *
   * @description
   * Email de l'utilisateur
   *
   * @memberof User2FAVerification
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
   * Code 2FA de l'utilisateur
   *
   * @memberof User2FAVerification
   * @since 1.0.0
   *
   * @type {string} code
   */
  code: string;
  //#endregion
}
