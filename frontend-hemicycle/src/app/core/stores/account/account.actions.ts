import { Action, createAction, props } from '@ngrx/store';
import { User, UserUpdatePayload } from '@app/core/models/user/user.model';
import { StoreOperationStatus } from '@app/core/models/store/store-operation-status.model';

/**
 * Action fetchAccount
 * @const fetchAccount
 *
 * @description
 * Action permettant de récupérer les informations du compte utilisateur
 *
 * @type {Action} fetchAccount
 */
export const fetchAccount = createAction(
  '[Account] Fetch Account'
);

/**
 * Action fetchAccountSuccess
 * @const fetchAccountSuccess
 *
 * @description
 * Action permettant de gérer le succès de la récupération
 * des informations du compte utilisateur
 *
 * @type {Action} fetchAccountSuccess
 */
export const fetchAccountSuccess = createAction(
  '[Account] Fetch Account Success',
  props<{ user: User, status: StoreOperationStatus }>()
);

/**
 * Action fetchAccountFailure
 * @const fetchAccountFailure
 *
 * @description
 * Action permettant de gérer l'échec de la récupération
 * des informations du compte utilisateur
 *
 * @type {Action} fetchAccountFailure
 */
export const fetchAccountFailure = createAction(
  '[Account] Fetch Account Failure',
  props<{ status: StoreOperationStatus }>()
);

/**
 * Action updateAccount
 * @const updateAccount
 *
 * @description
 * Action permettant de mettre à jour les informations du compte utilisateur
 *
 * @type {Action} updateAccount
 */
export const updateAccount = createAction(
  '[Account] Update Account',
  props<{ payload: UserUpdatePayload }>()
);

/**
 * Action updateAccountSuccess
 * @const updateAccountSuccess
 *
 * @description
 * Action permettant de gérer le succès de la mise à jour
 * des informations du compte utilisateur
 *
 * @type {Action} updateAccountSuccess
 */
export const updateAccountSuccess = createAction(
  '[Account] Update Account Success',
  props<{ user: User, status: StoreOperationStatus }>()
);

/**
 * Action updateAccountFailure
 * @const updateAccountFailure
 *
 * @description
 * Action permettant de gérer l'échec de la mise à jour
 * des informations du compte utilisateur
 *
 * @type {Action} updateAccountFailure
 */
export const updateAccountFailure = createAction(
  '[Account] Update Account Failure',
  props<{ status: StoreOperationStatus }>()
);

/**
 * Action deleteAccount
 * @const deleteAccount
 *
 * @description
 * Action permettant de supprimer le compte utilisateur
 *
 * @type {Action} deleteAccount
 */
export const deleteAccount = createAction(
  '[Account] Delete Account'
);

/**
 * Action deleteAccountSuccess
 * @const deleteAccountSuccess
 *
 * @description
 * Action permettant de gérer le succès de la suppression
 * du compte utilisateur
 *
 * @type {Action} deleteAccountSuccess
 */
export const deleteAccountSuccess = createAction(
  '[Account] Delete Account Success',
  props<{ status: StoreOperationStatus }>()
);

/**
 * Action deleteAccountFailure
 * @const deleteAccountFailure
 *
 * @description
 * Action permettant de gérer l'échec de la suppression
 * du compte utilisateur
 *
 * @type {Action} deleteAccountFailure
 */
export const deleteAccountFailure = createAction(
  '[Account] Delete Account Failure',
  props<{ status: StoreOperationStatus }>()
);

/**
 * Action setCurrentUser
 * @const setCurrentUser
 *
 * @description
 * Action permettant de définir l'utilisateur courant
 *
 * @type {Action} setCurrentUser
 */
export const setCurrentUser = createAction(
  '[Account] Set Current User',
  props<{ user: User | null }>()
);

/**
 * Action clearUser
 * @const clearUser
 *
 * @description
 * Action permettant de supprimer l'utilisateur courant
 *
 * @type {Action} clearUser
 */
export const clearUser = createAction(
  '[Account] Clear User'
);
