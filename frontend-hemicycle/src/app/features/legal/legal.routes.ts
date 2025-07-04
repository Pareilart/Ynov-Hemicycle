import { Routes } from '@core/models/route/route.model';
import { LegalCguComponent } from "@app/features/legal/pages/legal-cgu/legal-cgu.component";
import { LegalPolitiqueComponent } from "@app/features/legal/pages/legal-politique/legal-politique.component";
import { LegalMentionsComponent } from "@app/features/legal/pages/legal-mentions/legal-mentions.component";
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
    data: {
      breadcrumb: [
        {
          label: 'Conditions générales d\'utilisation',
          routerLink: '/legal/cgu',
        },
      ],
    },
    component: LegalCguComponent,
  },
  {
    path: 'politique',
    title: 'Politique de confidentialité',
    data: {
      breadcrumb: [
        {
          label: 'Politique de confidentialité',
          routerLink: '/legal/politique',
        },
      ],
    },
    component: LegalPolitiqueComponent,
  },
  {
    path: 'mentions',
    title: 'Mentions légales',
    data: {
      breadcrumb: [
        {
          label: 'Mentions légales',
          routerLink: '/legal/mentions',
        },
      ],
    },
    component: LegalMentionsComponent,
  },
];
