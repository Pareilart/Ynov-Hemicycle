/**
 * Modèle UserRequire2FA
 * @interface UserRequire2FA
 *
 * @description
 * Représente un utilisateur qui
 * a besoin de se connecter
 * avec un code 2FA
 *
 * @version 1.0.0
 *
 * @property {Date} expiresAt - Date de fin de validité
 * @property {boolean} requiresTwoFactor - Indique si l'utilisateur a besoin de se connecter avec un code 2FA
 */
export interface UserRequire2FA {
  //#region Propriétés
  /**
   * Propriété expiresAt
   * @readonly
   *
   * @description
   * Date de fin de validité
   *
   * @memberof UserRequire2FA
   * @since 1.0.0
   *
   * @type {Date} expiresAt
   */
  readonly expiresAt: Date;

  /**
   * Propriété requiresTwoFactor
   * @readonly
   *
   * @description
   * Indique si l'utilisateur a besoin de se connecter avec un code 2FA
   *
   * @memberof UserRequire2FA
   * @since 1.0.0
   *
   * @type {boolean} requiresTwoFactor
   */
  readonly requiresTwoFactor: boolean;
  //#endregion
}
