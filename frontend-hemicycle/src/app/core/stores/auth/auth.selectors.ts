import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { AUTH_FEATURE_KEY, AuthState, userAdapter } from "@core/stores/auth/auth.state";
import { Dictionary } from "@ngrx/entity";
import { User } from "@app/core/models/user/user.model";
import { JwtToken } from "@app/core/models/jwt/jwt-token.model";
import { StoreOperationStatus } from "@app/core/models/store/store-operation-status.model";

export const selectAuthState: MemoizedSelector<
  object,
  AuthState,
  DefaultProjectorFn<AuthState>
> = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const {
  selectAll: selectAllUser,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds,
  selectTotal: selectUserTotal
} = userAdapter.getSelectors();

export const selectCurrentUser = createSelector(
  selectAuthState,
  selectUserEntities,
  (state: AuthState, entities: Dictionary<User>) => state.selectedUserId ? entities[state.selectedUserId] : null
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectAuthOperation = createSelector(
  selectAuthState,
  (state: AuthState) => state.operation
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.operation.loading
);

export const selectAuthStatus = createSelector(
  selectAuthState,
  (state: AuthState) => state.operation.status
);

