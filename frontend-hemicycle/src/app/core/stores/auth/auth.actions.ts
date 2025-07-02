import { createAction, props } from '@ngrx/store';
import { User } from '@core/models/user/user.model';
import { JwtToken } from '@core/models/jwt/jwt-token.model';
import { UserCredentials } from '@core/models/user/user-credentials.model';
import { StoreOperationStatus } from '@app/core/models/store/store-operation-status.model';
import { UserRegistration } from '@app/core/models/user/user-registration.model';
import { User2FA } from '@app/core/models/user/user-2fa.model';

/**
 * Action login
 * @const login
 *
 * @description
 * Action permettant de se connecter
 *
 * @type {Action} login
 */
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: UserCredentials }>()
);

/**
 * Action loginSuccess
 * @const loginSuccess
 *
 * @description
 * Action permettant de gérer le
 * succès de la connexion
 *
 * @type {Action} loginSuccess
 */
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User, token: JwtToken, status: StoreOperationStatus }>()
);

/**
 * Action loginFailure
 * @const loginFailure
 *
 * @description
 * Action permettant de gérer le
 * échec de la connexion
 *
 * @type {Action} loginFailure
 */
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ status: StoreOperationStatus }>()
);

/**
 * Action register
 * @const register
 *
 * @description
 * Action permettant de se
 * inscrire
 *
 * @type {Action} register
 */
export const register = createAction(
  '[Auth] Register',
  props<{ registration: UserRegistration }>()
);

/**
 * Action registerSuccess
 * @const registerSuccess
 *
 * @description
 * Action permettant de gérer le
 * succès de l'inscription
 *
 * @type {Action} registerSuccess
 */
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User, status: StoreOperationStatus }>()
);

/**
 * Action registerFailure
 * @const registerFailure
 *
 * @description
 * Action permettant de gérer le
 * échec de l'inscription
 *
 * @type {Action} registerFailure
 */
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ status: StoreOperationStatus }>()
);

/**
 * Action logout
 * @const logout
 *
 * @description
 * Action permettant de se
 * déconnecter
 *
 * @type {Action} logout
 */
export const logout = createAction(
  '[Auth] Logout'
);

/**
 * Action logoutSuccess
 * @const logoutSuccess
 *
 * @description
 * Action permettant de gérer le
 * succès de la déconnexion
 *
 * @type {Action} logoutSuccess
 */
export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);

/**
 * Action logoutFailure
 * @const logoutFailure
 *
 * @description
 * Action permettant de gérer le
 * échec de la déconnexion
 *
 * @type {Action} logoutFailure
 */
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ status: StoreOperationStatus }>()
);

  /**
 * Action refresh
 * @const refresh
 *
 * @description
 * Action permettant de rafraîchir
 * le token
 *
 * @type {Action} refresh
 */
export const refresh = createAction(
  '[Auth] Refresh Token',
  props<{ refreshToken: string }>()
);

/**
 * Action refreshSuccess
 * @const refreshSuccess
 *
 * @description
 * Action permettant de gérer le
 * succès du rafraîchissement
 * du token
 *
 * @type {Action} refreshSuccess
 */
export const refreshSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ token: JwtToken, status: StoreOperationStatus }>()
);

/**
 * Action refreshFailure
 * @const refreshFailure
 *
 * @description
 * Action permettant de gérer le
 * échec du rafraîchissement
 * du token
 *
 * @type {Action} refreshFailure
 */
export const refreshFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ status: StoreOperationStatus }>()
);

/**
 * Action verify2FA
 * @const verify2FA
 *
 * @description
 * Action permettant de vérifier
 * le code 2FA
 *
 * @type {Action} verify2FA
 */
export const verify2FA = createAction(
  '[Auth] Verify 2FA',
  props<{ twoFA: User2FA }>()
);

/**
 * Action verify2FASuccess
 * @const verify2FASuccess
 *
 * @description
 * Action permettant de gérer le
 * succès de la vérification
 * du code 2FA
 *
 * @type {Action} verify2FASuccess
 */
export const verify2FASuccess = createAction(
  '[Auth] Verify 2FA Success',
  props<{ user: User, token: JwtToken, status: StoreOperationStatus }>()
);

/**
 * Action verify2FAFailure
 * @const verify2FAFailure
 *
 * @description
 * Action permettant de gérer le
 * échec de la vérification
 * du code 2FA
 *
 * @type {Action} verify2FAFailure
 */
export const verify2FAFailure = createAction(
  '[Auth] Verify 2FA Failure',
  props<{ status: StoreOperationStatus }>()
);

/**
 * Action fetchMe
 * @const fetchMe
 *
 * @description
 * Action permettant de récupérer
 * les informations de l'utilisateur
 *
 * @type {Action} fetchMe
 */
export const fetchMe = createAction(
  '[Auth] Fetch Me'
);

/**
 * Action fetchMeSuccess
 * @const fetchMeSuccess
 *
 * @description
 * Action permettant de gérer le
 * succès de la récupération
 * des informations de l'utilisateur
 *
 * @type {Action} fetchMeSuccess
 */
export const fetchMeSuccess = createAction(
  '[Auth] Fetch Me Success',
  props<{ user: User, status: StoreOperationStatus }>()
);

/**
 * Action fetchMeFailure
 * @const fetchMeFailure
 *
 * @description
 * Action permettant de gérer le
 * échec de la récupération
 * des informations de l'utilisateur
 *
 * @type {Action} fetchMeFailure
 */
export const fetchMeFailure = createAction(
  '[Auth] Fetch Me Failure',
  props<{ status: StoreOperationStatus }>()
);



