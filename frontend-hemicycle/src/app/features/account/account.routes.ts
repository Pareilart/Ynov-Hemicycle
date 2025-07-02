import { Routes } from "@core/models/route/route.model";
import { AccountOnboardingComponent } from "./pages/account-onboarding/account-onboarding.component";
import { OnBoardingGuard } from "@features/account/guards/onboarding.guard";

/**
 * Routes ACCOUNT_ROUTES
 * @const ACCOUNT_ROUTES
 *
 * @description
 * Routes pour le module legal
 *
 * @type {Routes} ACCOUNT_ROUTES
 *
 * @see https://angular.dev/guide/router
 */
export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'onboarding',
    title: 'Embarquement',
    component: AccountOnboardingComponent,
    canActivate: [OnBoardingGuard]
  },
];
