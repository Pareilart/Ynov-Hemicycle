import { Routes } from '@core/models/route/route.model';
import { AuthLoginComponent } from "@features/auth/pages/auth-login/auth-login.component";
import { AuthRegisterComponent } from "@features/auth/pages/auth-register/auth-register.component";
import { AuthForgotPasswordComponent } from "@features/auth/pages/auth-forgot-password/auth-forgot-password.component";
import { AuthResetPasswordComponent } from "@features/auth/pages/auth-reset-password/auth-reset-password.component";
import { AuthHomeComponent } from '@features/auth/pages/auth-home/auth-home.component';
import { Auth2FAVerificationFormComponent } from './forms/auth-2fa-verification-form/auth-2fa-verification-form.component';
import { AuthEmailResolver } from '@app/features/auth/resolvers/auth-email.resolver';
import { AuthEmailVerificationComponent } from './pages/auth-email-verification/auth-email-verification.component';

/**
 * Routes AUTH_ROUTES
 * @const AUTH_ROUTES
 *
 * @description
 * Routes pour le module auth
 *
 * @type {Routes} AUTH_ROUTES
 *
 * @see https://angular.dev/guide/router
 */
export const AUTH_ROUTES: Routes = [
  {
    path: '',
    title: 'Authentification',
    component: AuthHomeComponent,
  },
  {
    path: 'login',
    title: 'Connexion',
    component: AuthLoginComponent,
  },
  {
    path: 'register',
    title: 'Inscription',
    component: AuthRegisterComponent,
  },
  {
    path: 'forgot-password',
    title: 'Mot de passe oublié',
    component: AuthForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    title: 'Réinitialisation du mot de passe',
    component: AuthResetPasswordComponent,
  },
  {
    path: 'verification',
    title: 'Confirmation 2FA',
    resolve: {
      email: AuthEmailResolver
    },
    component: Auth2FAVerificationFormComponent,
  },
  {
    path: 'email-verification',
    title: 'Confirmation Email',
    resolve: {
      email: AuthEmailResolver
    },
    component: AuthEmailVerificationComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
