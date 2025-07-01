import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn } from "@angular/common/http";
import { inject, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { Observable, of, throwError, catchError } from "rxjs";
import { REFRESH_TOKEN_KEY } from "../constants/sotrage-keys.constant";
import { AuthState } from "../stores/auth/auth.state";
import { Store } from "@ngrx/store";
import { Actions } from "@ngrx/effects";
import { selectAuthAccessToken } from "../stores/auth/auth.selectors";
import { logout, refresh } from "../stores/auth/auth.actions";
import { ofType} from "@ngrx/effects";
import { tap, take, switchMap } from "rxjs/operators";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const localStorageService = inject(LocalStorageService);
  const store = inject(Store);
  const actions$ = inject(Actions);

  let isRefreshing = false;

  const accessToken$ = store.select(selectAuthAccessToken);

  const addTokenToRequest = (request: HttpRequest<unknown>, token: string) => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const handleUnauthorizedRequest = (request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
    const refreshToken = localStorageService.retrieve(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      store.dispatch(logout());
      return throwError(() => new Error('No refresh token found'));
    }

    if (!isRefreshing) {
      isRefreshing = true;
      store.dispatch(refresh({ refreshToken }));

      return actions$.pipe(
        ofType('[Auth] Refresh Success', '[Auth] Refresh Failure'),
        take(1),
        switchMap((action: any) => {
          isRefreshing = false;

          if (action.type === '[Auth] Refresh Success') {
            const newRequest = addTokenToRequest(request, action.accessToken);
            return next(newRequest);
          } else {
            store.dispatch(logout());
            return throwError(() => new Error('Failed to refresh token'));
          }
        })
      );
    } else {
      return actions$.pipe(
        ofType('[Auth] Refresh Success', '[Auth] Refresh Failure'),
        take(1),
        switchMap((action: any) => {
          if (action.type === '[Auth] Refresh Success') {
            const newRequest = addTokenToRequest(request, action.accessToken);
            return next(newRequest);
          } else {
            store.dispatch(logout());
            return throwError(() => new Error('Failed to refresh token'));
          }
        })
      );
    }
  };

  const handleError = (request: HttpRequest<unknown>, error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
    if (error.status === 401) {
      return handleUnauthorizedRequest(request);
    }
    return throwError(() => error);
  };

  return new Observable<HttpEvent<unknown>>(subscriber => {
    accessToken$.pipe(
      take(1),
      switchMap(accessToken => {
        if (!accessToken) {
          return next(req);
        }

        const authReq = addTokenToRequest(req, accessToken);

        return next(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            return handleError(req, error);
          })
        );
      })
    ).subscribe({
      next: (event) => subscriber.next(event),
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete()
    });
  });
}

// @Injectable({ providedIn: 'root' })
// export class AuthInterceptor implements HttpInterceptor {
//   //#region Propriétés
//   /**
//    * Propriété localStorageService
//    * @readonly
//    *
//    * @description
//    * Service de stockage local
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @type {LocalStorageService} localStorageService
//    */
//   private readonly localStorageService: LocalStorageService =
//     inject<LocalStorageService>(LocalStorageService);

//   /**
//    * Propriété store
//    * @readonly
//    *
//    * @description
//    * Store de l'authentification
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @type {Store<AuthState>} store
//    */
//   private readonly store: Store<AuthState> =
//     inject<Store<AuthState>>(Store<AuthState>);

//   /**
//    * Propriété actions
//    * @readonly
//    *
//    * @description
//    * Actions de l'effet
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @type {Actions} actions
//    */
//   private readonly actions: Actions =
//     inject<Actions>(Actions);

//   /**
//    * Propriété accessToken
//    * @readonly
//    *
//    * @description
//    * Token d'accès
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @type {Signal<string | undefined>} accessToken
//    */
//   private readonly accessToken: Signal<string | undefined> =
//     this.store.selectSignal(selectAuthAccessToken);

//   /**
//    * Propriété isRefreshing
//    * @readonly
//    *
//    * @description
//    * Indicateur de rafraîchissement
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @type {WritableSignal<boolean>} isRefreshing
//    */
//   private readonly isRefreshing: WritableSignal<boolean> =
//     signal<boolean>(false);

//   /**
//    * Propriété newRefreshToken
//    * @readonly
//    *
//    * @description
//    * Token de rafraîchissement
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @type {WritableSignal<string | null>} newRefreshToken
//    */
//   private readonly newRefreshToken: WritableSignal<string | null> =
//     signal<string | null>(null);
//   //#endregion

//   //#region Méthodes
//   /**
//    * Méthode intercept
//    * @method intercept
//    *
//    * @description
//    * Méthode intercept pour intercepter les requêtes HTTP
//    *
//    * @access public
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @param {HttpRequest<unknown>} request - Requête HTTP
//    * @param {HttpHandler} next - Gestionnaire de requête HTTP
//    *
//    * @returns {Observable<HttpEvent<unknown>>} - Retourne la réponse de l'API
//    */
//   public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     if (request.url.includes('/auth/')) {
//       return next.handle(request);
//     }

//     return this.handleRequestWithToken(request, next);
//   }

//   private handleRequestWithToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const token: string | null = this.localStorageService.retrieve(REFRESH_TOKEN_KEY);
//     const accessToken: string | undefined = this.accessToken();

//     if (!token && !accessToken) {
//       return next.handle(request);
//     }

//     return this.handleRequest(request, next);
//   }

//   /**
//    * Méthode addTokenToRequest
//    * @method addTokenToRequest
//    *
//    * @description
//    * Méthode addTokenToRequest pour ajouter
//    * un token à une requête HTTP
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @param {HttpRequest<unknown>} request - Requête HTTP
//    * @param {string} token - Token
//    *
//    * @returns {HttpRequest<unknown>} - Retourne la requête HTTP avec le token
//    */
//   private addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
//     return request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }

//   /**
//    * Méthode handleUnauthorizedRequest
//    * @method handleUnauthorizedRequest
//    *
//    * @description
//    * Méthode handleUnauthorizedRequest pour gérer
//    * une requête non autorisée
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @param {HttpRequest<unknown>} request - Requête HTTP
//    * @param {HttpHandler} next - Gestionnaire de requête HTTP
//    *
//    * @returns {Observable<HttpEvent<unknown>>} - Retourne la réponse de l'API
//    */
//   private handleUnauthorizedRequest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const refreshToken: string | null = this.localStorageService.retrieve(REFRESH_TOKEN_KEY);
//     const isRefreshing: boolean = this.isRefreshing();

//     if (!refreshToken) {
//       this.store.dispatch(logout());
//       return throwError(() => new Error('No refresh token found'));
//     }

//     if (!isRefreshing) {
//       this.isRefreshing.set(true);
//       this.newRefreshToken.set(null);
//       this.store.dispatch(refresh({ refreshToken }));

//       // Wait for the refresh to complete
//       return this.actions.pipe(
//         ofType('[Auth] Refresh Success', '[Auth] Refresh Failure'),
//         take(1),
//         switchMap((action: any) => {
//           this.isRefreshing.set(false);

//           if (action.type === '[Auth] Refresh Success') {
//             this.newRefreshToken.set(action.accessToken);
//             const newRequest = this.addTokenToRequest(request, action.accessToken);
//             return next.handle(newRequest);
//           } else {
//             this.store.dispatch(logout());
//             return throwError(() => new Error('Failed to refresh token'));
//           }
//         })
//       );
//     } else {
//       // If already refreshing, wait for the new token
//       return this.actions.pipe(
//         ofType('[Auth] Refresh Success', '[Auth] Refresh Failure'),
//         take(1),
//         switchMap((action: any) => {
//           if (action.type === '[Auth] Refresh Success') {
//             const newRequest = this.addTokenToRequest(request, action.accessToken);
//             return next.handle(newRequest);
//           } else {
//             this.store.dispatch(logout());
//             return throwError(() => new Error('Failed to refresh token'));
//           }
//         })
//       );
//     }
//   }

//   /**
//    * Méthode handleError
//    * @method handleError
//    *
//    * @description
//    * Méthode handleError pour gérer les erreurs HTTP
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @param {HttpRequest<unknown>} request - Requête HTTP
//    * @param {HttpHandler} next - Gestionnaire de requête HTTP
//    * @param {HttpErrorResponse} error - Erreur HTTP
//    *
//    * @returns {Observable<HttpEvent<unknown>>} - Retourne la réponse de l'API
//    */
//   private handleError(
//     request: HttpRequest<unknown>,
//     next: HttpHandler,
//     error: HttpErrorResponse
//   ): Observable<HttpEvent<unknown>> {
//     if (error.status === 401) {
//       return this.handleUnauthorizedRequest(request, next);
//     }
//     return throwError(() => error);
//   }

//   /**
//    * Méthode handleRequest
//    * @method handleRequest
//    *
//    * @description
//    * Méthode handleRequest pour gérer une requête HTTP
//    *
//    * @access private
//    * @memberof AuthInterceptor
//    * @since 1.0.0
//    *
//    * @param {HttpRequest<unknown>} request - Requête HTTP
//    * @param {HttpHandler} next - Gestionnaire de requête HTTP
//    *
//    * @returns {Observable<HttpEvent<unknown>>} - Retourne la réponse de l'API
//    */
//   private handleRequest(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const accessToken = this.accessToken();

//     if (!accessToken) {
//       return next.handle(request);
//     }

//     const authReq = this.addTokenToRequest(request, accessToken);

//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         return this.handleError(request, next, error);
//       })
//     );
//   }
//   //#endregion
// }
