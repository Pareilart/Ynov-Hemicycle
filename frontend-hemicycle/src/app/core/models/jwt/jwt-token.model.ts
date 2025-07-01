/**
 * Interface JwtToken
 * @interface JwtToken
 *
 * @description
 * Représente un token JWT
 *
 * @version 1.0.0
 *
 * @property {string} token - Token JWT
 * @property {number} expiresIn - Date d'expiration du token
 * @property {number} exp - Date d'expiration du token
 *
 * @example
 * ```typescript
 * const jwtToken: JwtToken = {
 *   token: "token",
 *   expiresIn: 3600,
 *   exp: 1626000000
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface JwtToken {
  //#region Propriétés
  /**
   * Propriété token
   * @readonly
   *
   * @description
   * Token JWT
   *
   * @access public
   * @memberof JwtToken
   * @since 1.0.0
   *
   * @type {string} token
   */
  readonly token: string;

  /**
   * Propriété expiresIn
   * @readonly
   *
   * @description
   * Date d'expiration du token
   *
   * @access public
   * @memberof JwtToken
   * @since 1.0.0
   *
   * @type {number} expiresIn
   */
  readonly expiresIn: number;

  /**
   * Propriété exp
   * @readonly
   *
   * @description
   * Date d'expiration du token
   *
   * @access public
   * @memberof JwtToken
   * @since 1.0.0
   *
   * @type {number} exp
   */
  readonly exp: number;
  //#endregion
}
