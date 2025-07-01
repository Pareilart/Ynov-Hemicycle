import { Routes } from '@core/models/route/route.model';
import { ProfilDeputeComponent } from "@app/features/profil/pages/profil-depute/profil-depute.component";
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
    path: 'depute',
    title: 'Profil député',
    component: ProfilDeputeComponent,
  },
];
