import { HttpEvent, HttpHandlerFn, HttpRequest, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAuthAccessToken } from '../stores/auth/auth.selectors';
import { refresh, logout } from '../stores/auth/auth.actions';
import { signal, effect, WritableSignal } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { REFRESH_TOKEN_KEY } from '../constants/storage-keys.constant';

export const refreshInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const store = inject(Store);
  const localStorageService = inject(LocalStorageService);
  const isRefreshing = signal<boolean>(false);
  const refreshToken = signal<string | null>(null);
  const tokenRefreshed = signal<boolean>(false);

  const addToken = (request: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> => {
    if (!token) return request;

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const handle401Error = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if (!isRefreshing()) {
      isRefreshing.set(true);
      refreshToken.set(null);
      tokenRefreshed.set(false);

      const actualRefreshToken = localStorageService.retrieve(REFRESH_TOKEN_KEY);

      // Démarrer le rafraîchissement du token
      store.dispatch(refresh({ refreshToken: actualRefreshToken }));

      return new Observable<HttpEvent<unknown>>(subscriber => {
        const effectRef = effect(() => {
          const newToken = store.selectSignal(selectAuthAccessToken)();

          if (newToken) {
            isRefreshing.set(false);
            tokenRefreshed.set(true);
            refreshToken.set(newToken);
            effectRef.destroy();

            next(addToken(request, newToken)).subscribe({
              next: (event) => subscriber.next(event),
              error: (err) => subscriber.error(err),
              complete: () => subscriber.complete()
            });
          }
        });

        // Nettoyage
        return () => effectRef.destroy();
      });
    } else {
      // Si un rafraîchissement est déjà en cours
      return new Observable<HttpEvent<unknown>>(subscriber => {
        const effectRef = effect(() => {
          if (tokenRefreshed() && refreshToken()) {
            effectRef.destroy();
            next(addToken(request, refreshToken())).subscribe({
              next: (event) => subscriber.next(event),
              error: (err) => subscriber.error(err),
              complete: () => subscriber.complete()
            });
          }
        });

        // Nettoyage
        return () => effectRef.destroy();
      });
    }
  };

  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(req, next);
      }
      return throwError(() => error);
    })
  );
};
