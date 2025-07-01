import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import * as AuthActions from "./auth.actions";

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),
  on(AuthActions.loginSuccess, (state, { user, token, status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    },
    selectedUserId: user.id,
    token: token,
    isAuthenticated: true
  })),
  on(AuthActions.loginFailure, (state, { status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    }
  })),
  on(AuthActions.register, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),
  on(AuthActions.registerSuccess, (state, { user, status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    },
    selectedUserId: user.id,
    isAuthenticated: false
  })),
  on(AuthActions.registerFailure, (state, { status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    }
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    operation: {
      loading: false,
      status: null
    },
    selectedUserId: null,
    token: null,
    isAuthenticated: false
  })),
  on(AuthActions.logoutFailure, (state, { status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    }
  })),
  on(AuthActions.refreshSuccess, (state, { token }) => ({
    ...state,
    token: token,
    isAuthenticated: true
  })),
  on(AuthActions.refreshFailure, (state, { status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    }
  }))
);

