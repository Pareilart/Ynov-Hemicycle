import { Routes } from '@core/models/route/route.model';
import { SystemHttpExceptionComponent } from "@features/system/pages/system-http-exception/system-http-exception.component";
import { HTTPExceptionResolver } from "@features/system/resolvers/http-exception.resolver";
import { HTTPExceptionTitleResolver } from "@features/system/resolvers/http-exception-title.resolver";
import { SystemMaintenanceComponent } from "@features/system/pages/system-maintenance/system-maintenance.component";
import { MaintenanceGuard } from "@core/guards/maintenance.guard";
import { HTTPExceptionCodeGuard } from "@features/system/guards/http-exception-code.guard";

/**
 * Routes SYSTEM_ROUTES
 * @const SYSTEM_ROUTES
 *
 * @description
 * Routes pour le module system
 *
 * @type {Routes} SYSTEM_ROUTES
 *
 * @see https://angular.dev/guide/router
 */
export const SYSTEM_ROUTES: Routes = [
  {
    path: 'maintenance',
    title: 'Maintenance',
    component: SystemMaintenanceComponent,
    canActivate: [MaintenanceGuard],
  },
  {
    path: ':code',
    pathMatch: 'full',
    title: HTTPExceptionTitleResolver,
    component: SystemHttpExceptionComponent,
    canActivate: [HTTPExceptionCodeGuard],
    resolve: {
      exception: HTTPExceptionResolver
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404'
  }
];
