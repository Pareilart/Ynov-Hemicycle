import { Routes } from '@core/models/route/route.model';
import { PoliticalPartyComponent } from "@app/features/political/pages/political-party/political-party.component";
/**
 * Routes PROFIL_ROUTES
 * @const POLITICAL_ROUTES
 *
 * @description
 * Routes pour le module legal
 *
 * @type {Routes} PROFIL_ROUTES
 *
 * @see https://angular.dev/guide/router
 */
export const POLITICAL_ROUTES: Routes = [
  {
    path: 'party',
    title: 'Partis politiques',
    component: PoliticalPartyComponent,
  },
];
