import { createReducer, on } from '@ngrx/store';
import { initialAccountState } from './account.state';
import * as AccountActions from './account.actions';
import * as AuthActions from '../auth/auth.actions'

export const accountReducer = createReducer(
  initialAccountState,

  // Récupération des informations du compte
  on(AccountActions.fetchAccount, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),

  on(AccountActions.fetchAccountSuccess, (state, { user, status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    },
    user: user
  })),

  on(AccountActions.fetchAccountFailure, (state, { status }) => ({
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

  // Mise à jour des informations du compte
  on(AccountActions.updateAccount, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),

  on(AccountActions.updateAccountSuccess, (state, { user, status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    },
    user: user
  })),

  on(AccountActions.updateAccountFailure, (state, { status }) => ({
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

  // Suppression du compte
  on(AccountActions.deleteAccount, (state) => ({
    ...state,
    operation: {
      loading: true,
      status: null
    }
  })),

  on(AccountActions.deleteAccountSuccess, (state, { status }) => ({
    ...state,
    operation: {
      loading: false,
      status: {
        code: status.code,
        label: status.label,
        message: status.message
      }
    },
    user: null
  })),

  on(AccountActions.deleteAccountFailure, (state, { status }) => ({
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

  // Définir l'utilisateur courant
  on(AccountActions.setCurrentUser, (state, { user }) => ({
    ...state,
    user: user
  })),

  // Synchroniser avec l'utilisateur authentifié
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user: user
  })),

  on(AuthActions.verify2FASuccess, (state, { user }) => ({
    ...state,
    user: user
  })),

  on(AuthActions.fetchMeSuccess, (state, { user }) => ({
    ...state,
    user: user
  })),

  // Effacer l'utilisateur
  on(AccountActions.clearUser, (state) => ({
    ...state,
    user: null
  })),

  // Effacer l'utilisateur lors de la déconnexion
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null
  }))
);
