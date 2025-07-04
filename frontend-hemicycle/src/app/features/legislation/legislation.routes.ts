import { Routes } from "@core/models/route/route.model";
import { LegislationLawsListComponent } from "@features/legislation/pages/legislation-laws-list/legislation-laws-list.component";
import { LegislationLawsDetailComponent } from "@features/legislation/pages/legislation-laws-detail/legislation-laws-detail.component";
import { LegislationLawResolver } from "@features/legislation/resolvers/legislation-law.resolver";
import { LegislationLawsResolver } from "./resolvers/legislation-laws.resolver";

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
    data: {
      breadcrumb: [
        {
          label: 'Lois',
          routerLink: '/legislation/laws',
        },
      ],
    },
    component: LegislationLawsListComponent,
  },
  {
    path: 'laws/:id',
    title: 'Loi',
    resolve: {
      law: LegislationLawResolver,
    },
    data: {
      breadcrumb: [
        {
          label: 'Lois',
          routerLink: '/legislation/laws',
        },
        {
          label: 'Loi',
          routerLink: '/legislation/laws/:id',
        },
      ],
    },
    component: LegislationLawsDetailComponent,
  },
];
