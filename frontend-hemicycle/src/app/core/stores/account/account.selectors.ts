import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountState, ACCOUNT_FEATURE_KEY } from './account.state';
import { User } from '@app/core/models/user/user.model';
import { StoreOperation } from '@app/core/models/store/store-operation.model';

/**
 * Sélecteur de feature pour le compte
 * @const selectAccountState
 *
 * @description
 * Sélecteur de feature pour le compte
 *
 * @type {MemoizedSelector<object, AccountState>}
 */
export const selectAccountState: MemoizedSelector<
  object,
  AccountState
> = createFeatureSelector<AccountState>(ACCOUNT_FEATURE_KEY);

/**
 * Sélecteur pour l'utilisateur courant
 * @const selectCurrentUser
 *
 * @description
 * Sélecteur pour l'utilisateur courant
 *
 * @type {MemoizedSelector<object, User | null>}
 */
export const selectAccountCurrentUser: MemoizedSelector<
  object,
  User | null
> = createSelector(
  selectAccountState,
  (state: AccountState) => state.user
);

/**
 * Sélecteur pour l'opération en cours
 * @const selectAccountOperation
 *
 * @description
 * Sélecteur pour l'opération en cours
 *
 * @type {MemoizedSelector<object, StoreOperation>}
 */
export const selectAccountOperation: MemoizedSelector<
  object,
  StoreOperation
> = createSelector(
  selectAccountState,
  (state: AccountState) => state.operation
);

/**
 * Sélecteur pour le statut de l'opération en cours
 * @const selectAccountLoading
 *
 * @description
 * Sélecteur pour le statut de l'opération en cours
 *
 * @type {MemoizedSelector<object, boolean>}
 */
export const selectAccountLoading: MemoizedSelector<object, boolean> = createSelector(
  selectAccountOperation,
  (operation: StoreOperation) => operation.loading
);
