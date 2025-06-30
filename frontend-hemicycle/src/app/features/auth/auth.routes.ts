import { Routes } from '@core/models/route/route.model';
import { AuthLoginComponent } from "@features/auth/pages/auth-login/auth-login.component";
import { AuthRegisterComponent } from "@features/auth/pages/auth-register/auth-register.component";
import { AuthForgotPasswordComponent } from "@features/auth/pages/auth-forgot-password/auth-forgot-password.component";
import { AuthResetPasswordComponent } from "@features/auth/pages/auth-reset-password/auth-reset-password.component";

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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
