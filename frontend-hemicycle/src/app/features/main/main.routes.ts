import { Routes } from '@core/models/route/route.model';
import { MainHomeComponent } from "@features/main/pages/main-home/main-home.component";

/**
 * Routes MAIN_ROUTES
 * @const MAIN_ROUTES
 *
 * @description
 * Routes pour le module main
 *
 * @type {Routes} MAIN_ROUTES
 *
 * @see https://angular.dev/guide/router
 */
export const MAIN_ROUTES: Routes = [
  {
    path: '',
    title: 'Accueil',
    component: MainHomeComponent,
    data: {
      hero: true
    }
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
