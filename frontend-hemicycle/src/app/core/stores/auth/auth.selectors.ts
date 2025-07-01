import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { AUTH_FEATURE_KEY, AuthState } from "@core/stores/auth/auth.state";

export const selectAuthState: MemoizedSelector<
  object,
  AuthState,
  DefaultProjectorFn<AuthState>
> = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectAuthAccessToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token?.token
);

export const selectAuthRefreshToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token?.refreshToken
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
