import { Routes } from '@core/models/route/route.model';
import { ProfilUserComponent } from "@app/features/profil/pages/profil-user/profil-user.component";
/**
 * Routes PROFIL_ROUTES
 * @const PROFIL_ROUTES
 *
 * @description
 * Routes pour le module legal
 *
 * @type {Routes} PROFIL_ROUTES
 *
 * @see https://angular.dev/guide/router
 */
export const PROFIL_ROUTES: Routes = [
  {
    path: 'user',
    title: 'Profil utilisateur',
    component: ProfilUserComponent,
  },
];
