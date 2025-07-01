import { createAction, props } from '@ngrx/store';
import { User } from '@core/models/user/user.model';
import { JwtToken } from '@core/models/jwt/jwt-token.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserCredentials } from '@core/models/user/user-credentials.model';
import { StoreOperationStatus } from '@app/core/models/store/store-operation-status.model';
import { UserRegistration } from '@app/core/models/user/user-registration.model';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: UserCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User, token: JwtToken, status: StoreOperationStatus }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ status: StoreOperationStatus }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ registration: UserRegistration }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User, status: StoreOperationStatus }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ status: StoreOperationStatus }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);

export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ status: StoreOperationStatus }>()
);

