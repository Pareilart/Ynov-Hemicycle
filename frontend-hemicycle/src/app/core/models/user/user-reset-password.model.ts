
/**
 * Type UserResetPassword
 * @type UserResetPassword
 *
 * @description
 * Représente un utilisateur à mot
 * de passe oublié
 *
 * @version 1.0.0
 *
 * @property {string} password - Mot de passe de l'utilisateur
 * @property {string} passwordConfirmation - Confirmation du mot de passe de l'utilisateur
 *
 * @example
 * ```typescript
 * const userResetPassword: UserResetPassword = {
 *   password: "password",
 *   passwordConfirmation: "password"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type UserResetPassword = {
  //#region Propriétés
  /**
   * Propriété password
   *
   * @description
   * Mot de passe de l'utilisateur
   *
   * @memberof UserResetPassword
   * @since 1.0.0
   *
   * @type {string} password
   */
  password: string;

  /**
   * Propriété passwordConfirmation
   *
   * @description
   * Confirmation du mot de passe de l'utilisateur
   *
   * @memberof UserResetPassword
   * @since 1.0.0
   *
   * @type {string} passwordConfirmation
   */
  passwordConfirmation: string;
  //#endregion
};
