import { StoreOperationStatus } from "@core/models/store/store-operation-status.model";

/**
 * Interface StoreOperation
 * @interface StoreOperation
 *
 * @description
 * Définit les propriétés communes à toutes
 * les opérations de store
 *
 * @version 1.0.0
 *
 * @property {boolean} loading - Indique si une opération est en cours
 * @property {StoreOperationStatus | null} status - Statut de l'opération
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface StoreOperation {
  //#region Propriétés
  /**
   * Propriété loading
   *
   * Indique si une opération est en cours
   *
   * @memberof StoreOperation
   * @since 1.0.0
   *
   * @type {boolean} loading
   */
  loading: boolean;

  /**
   * Propriété status
   *
   * Statut de l'opération
   *
   * @memberof StoreOperation
   * @since 1.0.0
   *
   * @type {StoreOperationStatus | null} status
   */
  status: StoreOperationStatus | null;
  //#endregion
}
