import { ApplicationConfig, ApplicationRef, inject, PLATFORM_ID, provideAppInitializer, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';
import { APP_ROUTES } from '@app/app.routes';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { TitleStrategy } from '@core/strategies/title.strategy';
import { environment } from '@environments/environment';
import { provideTitleStrategy } from '@core/providers/title-strategy.provider';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { DialogService } from 'primeng/dynamicdialog';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './core/stores/auth/auth.reducer';
import { AuthEffects } from './core/stores/auth/auth.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AUTH_FEATURE_KEY } from './core/stores/auth/auth.state';
import { LocalStorageService } from 'ngx-webstorage';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { REFRESH_TOKEN_KEY } from './core/constants/sotrage-keys.constant';
import { refresh } from './core/stores/auth/auth.actions';
import { first, tap } from 'rxjs';

/**
 * Interceptors
 * @const interceptors
 *
 * @description
 * Interceptors pour les requêtes HTTP
 *
 * @type {HttpInterceptorFn[]} Interceptors
 *
 * @see https://angular.dev/guide/http
 */
const interceptors: HttpInterceptorFn[] = [authInterceptor];

/**
 * Configuration client
 * @const appConfig
 *
 * @description
 * Configuration client pour le rendu côté client (CSR)
 *
 * @type {ApplicationConfig} Configuration client
 *
 * @see https://angular.dev/guide/ssr
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(
      withFetch(),
      withInterceptors(interceptors),
      withXsrfConfiguration({
        cookieName: 'csrftoken',
        headerName: 'X-CSRFToken'
      })
    ),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          },
        }
      }
    }),
    provideTitleStrategy(TitleStrategy),
    provideNgxWebstorage(withNgxWebstorageConfig({
      prefix: environment.storage.prefix,
      separator: environment.storage.separator,
      caseSensitive: environment.storage.caseSensitive
    }),
    withLocalStorage(),
    withSessionStorage()),
    DialogService,
    provideStore({
      [AUTH_FEATURE_KEY]: authReducer
    }),
    provideEffects([AuthEffects])
  ]
};
