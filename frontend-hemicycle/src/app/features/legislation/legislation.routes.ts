import { Routes } from "@core/models/route/route.model";
import { LegislationLawsFeedComponent } from "@features/legislation/pages/legislation-laws-feed/legislation-laws-feed.component";

/**
 * Routes LEGISLATION_ROUTES
 * @const LEGISLATION_ROUTES
 *
 * @description
 * Routes pour le module legislation
 *
 * @type {Routes} LEGISLATION_ROUTES
 *
 * @see https://angular.dev/guide/router
 */
export const LEGISLATION_ROUTES: Routes = [
  {
    path: 'laws',
    title: 'Lois',
    component: LegislationLawsFeedComponent,
  },
];
