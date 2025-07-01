/**
 * Interface StoreOperationStatus
 * @interface StoreOperationStatus
 *
 * @description
 * Définit les propriétés communes à toutes
 * les opérations de store
 *
 * @version 1.0.0
 *
 * @property {number | undefined} code - Code HTTP de code
 * @property {string} label - Libellé de statut
 * @property {string} message - Message de statut
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface StoreOperationStatus {
  //#region Propriétés
  /**
   * Propriété code
   *
   * Code HTTP de code
   *
   * @memberof StoreOperationStatus
   * @since 1.0.0
   *
   * @type {number} code
   */
  code?: number;

  /**
   * Propriété label
   *
   * Libellé de statut
   *
   * @memberof StoreOperationStatus
   * @since 1.0.0
   *
   * @type {string} labe
   */
  label: string;

  /**
   * Propriété message
   *
   * Message de statut
   *
   * @memberof StoreOperationStatus
   * @since 1.0.0
   *
   * @type {string} message
   */
  message: string;
  //#endregion
}
