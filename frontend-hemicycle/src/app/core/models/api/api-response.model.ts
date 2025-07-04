/**
 * Interface ApiReponse
 * @interface ApiReponse
 *
 * @description
 * Représente une réponse API
 *
 * @version 1.0.0
 *
 * @property {boolean} success - Indique si la requête a réussi
 * @property {string} message - Message de la réponse
 * @property {T} data - Données de la réponse
 *
 * @example
 * ```typescript
 * const apiResponse: ApiReponse<User> = {
 *   success: true,
 *   message: "Opération réussie",
 *   data: user
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface ApiReponse<T> {
  //#region Propriétés
  /**
   * Propriété success
   * @readonly
   *
   * @description
   * Indique si la requête a réussi
   *
   * @access public
   * @memberof ApiReponse
   * @since 1.0.0
   *
   * @type {boolean} success
   */
  readonly success: boolean;

  /**
   * Propriété message
   * @readonly
   *
   * @description
   * Message de la réponse
   *
   * @access public
   * @memberof ApiReponse
   * @since 1.0.0
   *
   * @type {string} message
   */
  readonly message: string;

  /**
   * Propriété data
   * @readonly
   *
   * @description
   * Données de la réponse
   *
   * @access public
   * @memberof ApiReponse
   * @since 1.0.0
   *
   * @type {T} data
   */
  readonly data: T;
  //#endregion
}
