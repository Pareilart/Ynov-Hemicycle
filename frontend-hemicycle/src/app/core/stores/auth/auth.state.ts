import { StoreOperation } from "@core/models/store/store-operation.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { User } from "@core/models/user/user.model";
import { JwtToken } from "@core/models/jwt/jwt-token.model";

/**
 * Constante AUTH_FEATURE_KEY
 * @const AUTH_FEATURE_KEY
 *
 * @description
 * Clé de la fonctionnalité d'authentification
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export const AUTH_FEATURE_KEY: string = 'auth';

/**
 * Constante userAdapter
 * @const userAdapter
 *
 * @description
 * Adaptateur de l'entité User
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
});

/**
 * Interface AuthState
 * @interface AuthState
 *
 * @description
 * Représente l'état de l'authentification
 *
 * @version 1.0.0
 *
 * @property {EntityState<User>} entities - Entités de l'authentification
 * @property {string | null} selectedUserId - Identifiant de l'utilisateur sélectionné
 * @property {JwtToken | null} token - Token de l'utilisateur
 * @property {boolean} isAuthenticated - Indique si l'utilisateur est authentifié
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface AuthState {
  //#region Propriétés
  /**
   * Propriété operation
   *
   * @description
   * Opération en cours
   *
   * @memberof AuthState
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
   * @memberof AuthState
   * @since 1.0.0
   *
   * @type {User | null} user
   */
  user: User | null;

  /**
   * Propriété token
   *
   * @description
   * Token de l'utilisateur
   *
   * @memberof AuthState
   * @since 1.0.0
   *
   * @type {JwtToken | null} token
   */
  token: JwtToken | null;

  /**
   * Propriété isAuthenticated
   *
   * @description
   * Indique si l'utilisateur est authentifié
   *
   * @memberof AuthState
   * @since 1.0.0
   *
   * @type {boolean} isAuthenticated
   */
  isAuthenticated: boolean;

  /**
   * Propriété isRefreshing
   *
   * @description
   * Indique si une requête de rafraîchissement
   * est en cours
   *
   * @memberof AuthState
   * @since 1.0.0
   *
   * @type {boolean} isRefreshing
   */
  isRefreshing: boolean;
  //#endregion
};

/**
 * Constante initialAuthState
 * @const initialAuthState
 *
 * @description
 * État initial de l'authentification
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export const initialAuthState: AuthState = {
  operation: {
    loading: false,
    status: null
  },
  user: null,
  token: null,
  isAuthenticated: false,
  isRefreshing: false
};
