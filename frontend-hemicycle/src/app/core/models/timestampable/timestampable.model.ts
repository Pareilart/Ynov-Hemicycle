/**
 * Modèle Timestampable
 * @interface Timestampable
 *
 * @description
 * Représente un objet avec des timestamps
 *
 * @version 1.0.0
 *
 * @property {Date} createdAt - Date de création
 * @property {Date} updatedAt - Date de mise à jour
 * @property {Date | undefined} deletedAt - Date de suppression
 *
 * @example
 * ```typescript
 * const timestampable: Timestampable = {
 *   createdAt: new Date(),
 *   updatedAt: new Date(),
 *   deletedAt: undefined
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface Timestampable {
  //#region Propriétés
  /**
   * Propriété createdAt
   * @readonly
   *
   * @description
   * Date de création
   *
   * @memberof Timestampable
   * @since 1.0.0
   *
   * @type {Date} createdAt
   */
  readonly createdAt: Date;

  /**
   * Propriété updatedAt
   * @readonly
   *
   * @description
   * Date de mise à jour
   *
   * @memberof Timestampable
   * @since 1.0.0
   *
   * @type {Date} updatedAt
   */
  readonly updatedAt: Date;

  /**
   * Propriété deletedAt
   * @readonly
   *
   * @description
   * Date de suppression
   *
   * @memberof Timestampable
   * @since 1.0.0
   *
   * @type {Date} deletedAt
   */
  readonly deletedAt?: Date;
  //#endregion
};
