import { MaintenanceGuard } from '@core/guards/maintenance.guard';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { Routes } from '@core/models/route/route.model';

/**
 * Routes APP_ROUTES
 * @const APP_ROUTES
 *
 * @description
 * Routes pour le router
 *
 * @type {Routes} APP_ROUTES
 *
 * @see https://angular.dev/guide/router
 */
export const APP_ROUTES: Routes = [
  {
    path: '',
    canActivate: [MaintenanceGuard],
    children: [
      {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () => import('@features/auth/auth.routes').then(m => m.AUTH_ROUTES)
      },
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('@features/main/main.routes').then(m => m.MAIN_ROUTES)
          },
          {
            path: 'legislation',
            loadChildren: () => import('@features/legislation/legislation.routes').then(m => m.LEGISLATION_ROUTES)
          },
        ]
      },
    ]
  },
  {
    path: 'system',
    loadChildren: () => import('@features/system/system.routes').then(m => m.SYSTEM_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'system/404',
    pathMatch: 'full'
  }
];
