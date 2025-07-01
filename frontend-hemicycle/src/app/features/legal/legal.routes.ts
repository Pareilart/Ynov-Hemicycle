import { Routes } from '@core/models/route/route.model';
import { LegalCguComponent } from "@app/features/legal/pages/legal-cgu/legal-cgu.component";
/**
 * Routes LEGAL_ROUTES
 * @const LEGAL_ROUTES
 *
 * @description
 * Routes pour le module legal
 *
 * @type {Routes} LEGAL_ROUTES
 *
 * @see https://angular.dev/guide/router
 */
export const LEGAL_ROUTES: Routes = [
  {
    path: 'cgu',
    title: 'Conditions générales d\'utilisation',
    component: LegalCguComponent,
  },
];
