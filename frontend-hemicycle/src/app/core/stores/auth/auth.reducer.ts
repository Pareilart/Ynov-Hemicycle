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
    user: user,
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
  on(AuthActions.loginSuccessWith2FA, (state, { requires, email, status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    },
    isAuthenticated: true
  })),
  on(AuthActions.verify2FA, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),
  on(AuthActions.verify2FAFailure, (state, { status }) => ({
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
  on(AuthActions.verify2FASuccess, (state, { user, token, status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    },
    user: user,
    token: token,
    isAuthenticated: true
  })),
  on(AuthActions.verifyEmail, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),
  on(AuthActions.verifyEmailSuccess, (state, { status }) => ({
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
  on(AuthActions.verifyEmailFailure, (state, { status }) => ({
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
    user: user,
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
    user: null,
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
  on(AuthActions.refresh, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    },
    isRefreshing: true
  })),
  on(AuthActions.refreshSuccess, (state, { token }) => ({
    ...state,
    token: token,
    operation: {
      loading: false,
      status: null
    },
    isAuthenticated: true,
    isRefreshing: false
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
    },
    isRefreshing: false
  })),
  on(AuthActions.fetchMeSuccess, (state, { user }) => ({
    ...state,
    user: user,
    isAuthenticated: true
  })),
  on(AuthActions.fetchMeFailure, (state, { status }) => ({
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

