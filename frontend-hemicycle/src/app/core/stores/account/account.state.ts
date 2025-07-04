import { StoreOperation } from "@app/core/models/store/store-operation.model";
import { User } from "@app/core/models/user/user.model";

/**
 * Constante ACCOUNT_FEATURE_KEY
 * @const ACCOUNT_FEATURE_KEY
 *
 * @description
 * Clé de la fonctionnalité de compte
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export const ACCOUNT_FEATURE_KEY: string = 'account';

/**
 * Interface AuthState
 * @interface AuthState
 *
 * @description
 * Représente l'état de l'authentification
 *
 * @version 1.0.0
 *
 * @property {StoreOperation} operation - Opération en cours
 * @property {User | null} user - Utilisateur connecté
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface AccountState {
  //#region Propriétés
  /**
   * Propriété operation
   *
   * @description
   * Opération en cours
   *
   * @memberof AccountState
   * @since 1.0.0
   *
   * @type {StoreOperation} operation
   */
  operation: StoreOperation;

  /**
   * Propriété user
   *
   * @description
   * Utilisateur connecté
   *
   * @memberof AccountState
   * @since 1.0.0
   *
   * @type {User | null} user
   */
  user: User | null;
  //#endregion
};

/**
 * Constante initialAccountState
 * @const initialAccountState
 *
 * @description
 * État initial de l'authentification
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export const initialAccountState: AccountState = {
  operation: {
    loading: false,
    status: null
  },
  user: null
};
