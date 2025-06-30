/**
 * Enum UserGender
 * @enum UserGender
 *
 * @description
 * Représente le genre d'un utilisateur
 *
 * @version 1.0.0
 *
 * @property {string} MALE - Masculin
 * @property {string} FEMALE - Féminin
 * @property {string} OTHER - Autre
 * @property {string} PREFER_NOT_TO_SAY - Préfère ne pas dire
 *
 * @example
 * ```typescript
 * const userGender: UserGender = UserGender.MALE;
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export enum UserGender {
  //#region Constantes
  /**
   * Constante MALE
   *
   * @description
   * Genre masculin
   *
   * @memberof UserGender
   * @since 1.0.0
   *
   * @type {string} MALE
   */
  MALE = "MALE",

  /**
   * Constante FEMALE
   *
   * @description
   * Genre féminin
   *
   * @memberof UserGender
   * @since 1.0.0
   *
   * @type {string} FEMALE
   */
  FEMALE = "FEMALE",

  /**
   * Constante OTHER
   *
   * @description
   * Genre autre
   *
   * @memberof UserGender
   * @since 1.0.0
   *
   * @type {string} OTHER
   */
  OTHER = "OTHER",

  /**
   * Constante PREFER_NOT_TO_SAY
   *
   * @description
   * Genre préfère ne pas dire
   *
   * @memberof UserGender
   * @since 1.0.0
   *
   * @type {string} PREFER_NOT_TO_SAY
   */
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY"
  //#endregion
}
