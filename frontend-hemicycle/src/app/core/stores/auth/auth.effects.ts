import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { AuthService } from "@app/core/services/api/auth.service";
import { Router } from "@angular/router";
import * as AuthActions from "@core/stores/auth/auth.actions";
import { UserCredentials } from "@app/core/models/user/user-credentials.model";
import { catchError, EMPTY, map, of, switchMap, take, tap } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { ApiReponse } from "@app/core/models/api/api-response.model";
import { User } from "@app/core/models/user/user.model";
import { JwtToken } from "@app/core/models/jwt/jwt-token.model";
import { StoreOperationStatus } from "@app/core/models/store/store-operation-status.model";
import { UserRegistration } from "@app/core/models/user/user-registration.model";
import { LocalStorageService } from "ngx-webstorage";
import { REFRESH_TOKEN_KEY } from "@app/core/constants/sotrage-keys.constant";

@Injectable()
export class AuthEffects {
  //#region Propriétés
  /**
   * Propriété actions
   * @readonly
   *
   * @description
   * Actions de l'effet
   *
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @type {Actions} actions
   */
  private readonly actions: Actions =
    inject<Actions>(Actions);

  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Store de l'effet
   *
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @type {Store<AuthState>} store
   */
  private readonly store: Store<AuthState> =
    inject<Store<AuthState>>(Store<AuthState>);

  /**
   * Propriété authService
   * @readonly
   *
   * @description
   * Service de l'authentification
   *
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @type {AuthService} authService
   */
  private readonly authService: AuthService =
    inject<AuthService>(AuthService);

  /**
   * Propriété localStorageService
   * @readonly
   *
   * @description
   * Propriété localStorageService pour injecter
   * le service LocalStorageService
   *
   * @access private
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @type {LocalStorageService} localStorageService
   */
  private readonly localStorageService: LocalStorageService =
    inject<LocalStorageService>(LocalStorageService);

  /**
   * Propriété router
   * @readonly
   *
   * @description
   * Router de l'effet
   *
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @type {Router} router
   */
  private readonly router: Router =
    inject<Router>(Router);
  //#endregion

  //#region Méthodes
  /**
   * Méthode login$
   * @method login$
   *
   * @description
   * Effet login pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public login$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.login),
    switchMap(({ credentials }: { credentials: UserCredentials }) => this.authService.login(credentials).pipe(
      map((response: HttpResponse<ApiReponse<User & { token: JwtToken }>>) => {
        if (!response.body?.data) {
          return AuthActions.loginFailure({ status: {
            code: response.status,
            label: 'Login Failure',
            message: 'Login Failure'
          } });
        }

        const token: JwtToken = response.body.data.token;
        const user: User = response.body.data;

        return AuthActions.loginSuccess({
          user: user,
          token: token,
          status: {
            code: response.status,
            label: 'Login Success',
            message: 'Login Success'
          }
        });
      }),
      catchError(error => of(AuthActions.loginFailure({ status: error.status })))
    ))
  ));

  public loginSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.loginSuccess),
    tap(({ user, token }: { user: User, token: JwtToken }) => {
      this.router.navigate(['/']);

      this.localStorageService.store(
        REFRESH_TOKEN_KEY,
        token.refreshToken
      );
    })
  ), { dispatch: false });

  public loginFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.loginFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });

  public register$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.register),
    switchMap(({ registration }: { registration: UserRegistration }) => this.authService.register(registration).pipe(
      map((response: HttpResponse<ApiReponse<User>>) => {
        if (!response.body?.data) {
          return AuthActions.registerFailure({ status: {
            code: response.status,
            label: 'Register Failure',
            message: 'Register Failure'
          } });
        }

        const user: User = response.body.data;

        return AuthActions.registerSuccess({
          user: user,
          status: {
            code: response.status,
            label: 'Register Success',
            message: 'Register Success'
          }
        });
      }),
      catchError(error => of(AuthActions.registerFailure({ status: error.status })))
    ))
  ));

  public registerSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.registerSuccess),
    tap(({ user }: { user: User }) => {
      this.router.navigate(['/auth/login']);
    })
  ), { dispatch: false });

  public registerFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.registerFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });

  public logoutSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.logoutSuccess),
    tap(() => {
      this.localStorageService.clear(REFRESH_TOKEN_KEY);
      this.router.navigate(['/auth/login']);
    })
  ), { dispatch: false });

  public logoutFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.logoutFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });

  public refresh$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.refresh),
    switchMap(({ refreshToken }: { refreshToken: string }) => this.authService.refreshToken(refreshToken).pipe(
      map((response: HttpResponse<ApiReponse<JwtToken>>) => {
        if (!response.body?.data) {
          return AuthActions.refreshFailure({ status: {
            code: response.status,
            label: 'Refresh Token Failure',
            message: 'Refresh Token Failure'
          } });
        }

        const token: JwtToken = response.body.data;

        return AuthActions.refreshSuccess({
          token: token,
          status: {
            code: response.status,
            label: 'Refresh Token Success',
            message: 'Refresh Token Success'
          }
        });
      }),
      catchError(error => of(AuthActions.refreshFailure({ status: error.status })))
    ))
  ));

  public refreshSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.refreshSuccess),
    tap(({ token }: { token: JwtToken }) => {
      this.localStorageService.store(
        REFRESH_TOKEN_KEY,
        token.refreshToken
      );
    }),
    switchMap(() => [AuthActions.fetchMe()])
  ));

  public refreshFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.refreshFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });

  public fetchMe$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.fetchMe),
    switchMap(() => this.authService.me().pipe(
      map((response: HttpResponse<ApiReponse<User>>) => {
        if (!response.body?.data) {
          return AuthActions.fetchMeFailure({ status: {
            code: response.status,
            label: 'Fetch Me Failure',
            message: 'Fetch Me Failure'
          } });
        }

        const user: User = response.body.data;

        return AuthActions.fetchMeSuccess({
          user: user,
          status: {
            code: response.status,
            label: 'Fetch Me Success',
            message: 'Fetch Me Success'
          }
        });
      }),
      catchError(error => of(AuthActions.fetchMeFailure({ status: error.status })))
    ))
  ));

  public fetchMeSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.fetchMeSuccess),
    tap(({ user }: { user: User }) => {
      console.log(user);
    })
  ), { dispatch: false });

  public fetchMeFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.fetchMeFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });
  //#endregion
}
