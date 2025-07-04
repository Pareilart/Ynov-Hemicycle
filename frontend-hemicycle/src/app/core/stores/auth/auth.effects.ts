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
import { REFRESH_TOKEN_KEY } from "@app/core/constants/storage-keys.constant";
import { User2FAVerification } from "@app/core/models/user/user-2fa-verification.model";
import { UserLoginResponse } from "@app/core/models/user/user-login-response.model";
import { UserEmailVerification } from "@app/core/models/user/user-email-verification.model";

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
      map((response: HttpResponse<ApiReponse<UserLoginResponse>>) => {
        if (!response.body?.data) {
          return AuthActions.loginFailure({ status: {
            code: response.status,
            label: 'Login Failure',
            message: 'Login Failure'
          } });
        }

        const data: UserLoginResponse = response.body.data;

        if ('requiresTwoFactor' in data && data.requiresTwoFactor) {
          return AuthActions.loginSuccessWith2FA({
            email: credentials.email,
            requires: data.requiresTwoFactor,
            status: {
              code: response.status,
              label: 'Login Success With 2FA',
              message: 'Login Success With 2FA'
            }
          });
        }

        const token = (data as User & { token: JwtToken }).token;
        const user = data as User;

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

  /**
   * Effet loginSuccessWith2FA
   * @method loginSuccessWith2FA$
   *
   * @description
   * Effet loginSuccessWith2FA pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public loginSuccessWith2FA$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.loginSuccessWith2FA),
    tap(({ requires, email, status }: { requires: boolean, email: string, status: StoreOperationStatus }) => {
      console.log(requires);
      this.router.navigate(['/auth/verification'], {
        queryParams: {
          email: email
        }
      });
    })
  ), { dispatch: false });

  /**
   * Effet loginSuccess
   * @method loginSuccess$
   *
   * @description
   * Effet loginSuccess pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public loginSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.loginSuccess),
    tap(({ user, token }: { user: User, token: JwtToken }) => {
      if (!user.emailVerifiedAt) {
        this.router.navigate(['/auth/email-verification'], {
          queryParams: {
            email: user.email
          }
        });
      } else {
        this.router.navigate(['/']);
      }

      this.localStorageService.store(
        REFRESH_TOKEN_KEY,
        token.refreshToken
      );
    })
  ), { dispatch: false });

  /**
   * Effet loginFailure
   * @method loginFailure$
   *
   * @description
   * Effet loginFailure pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public loginFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.loginFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });

  /**
   * Effet verify2FA
   * @method verify2FA$
   *
   * @description
   * Effet verify2FA pour vérifier le code 2FA
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public verify2FA$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.verify2FA),
    switchMap(({ twoFA }: { twoFA: User2FAVerification }) => this.authService.verify2FA(twoFA).pipe(
      map((response: HttpResponse<ApiReponse<User & { token: JwtToken }>>) => {
        if (!response.body?.data) {
          return AuthActions.verify2FAFailure({ status: {
            code: response.status,
            label: 'Verify 2FA Failure',
            message: 'Verify 2FA Failure'
          } });
        }

        const token: JwtToken = response.body.data.token;
        const user: User = response.body.data;

        return AuthActions.verify2FASuccess({
          user: user,
          token: token,
          status: {
            code: response.status,
            label: 'Verify 2FA Success',
            message: 'Verify 2FA Success'
          }
        });
      }),
      catchError(error => of(AuthActions.verify2FAFailure({ status: error.status })))
    ))
  ));

  /**
   * Effet verify2FASuccess
   * @method verify2FASuccess$
   *
   * @description
   * Effet verify2FASuccess pour vérifier le code 2FA
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public verify2FASuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.verify2FASuccess),
    tap(({ user, token }: { user: User, token: JwtToken }) => {
      this.router.navigate(['/']);

      this.localStorageService.store(
        REFRESH_TOKEN_KEY,
        token.refreshToken
      );
    })
  ), { dispatch: false });

  /**
   * Effet verify2FAFailure
   * @method verify2FAFailure$
   *
   * @description
   * Effet verify2FAFailure pour vérifier le code 2FA
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public verify2FAFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.verify2FAFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });


  public verifyEmail$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.verifyEmail),
    switchMap(({ verification }: { verification: UserEmailVerification }) => this.authService.verifyEmail(verification).pipe(
      map((response: HttpResponse<ApiReponse<User & { token: JwtToken }>>) => {
        if (!response.body?.data) {
          return AuthActions.verifyEmailFailure({ status: {
            code: response.status,
            label: 'Verify Email Failure',
            message: 'Verify Email Failure'
          } });
        }

        const token: JwtToken = response.body.data.token;
        const user: User = response.body.data;

        return AuthActions.verifyEmailSuccess({
          user: user,
          token: token,
          status: {
            code: response.status,
            label: 'Verify Email Success',
            message: 'Verify Email Success'
          }
        });
      }),
      catchError(error => of(AuthActions.verifyEmailFailure({ status: error.status })))
    ))
  ));

  public verifyEmailSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.verifyEmailSuccess),
    tap(({ user, token }: { user: User, token: JwtToken }) => {
      this.router.navigate(['/']);

      this.localStorageService.store(
        REFRESH_TOKEN_KEY,
        token.refreshToken
      );
    })
  ), { dispatch: false });

  public verifyEmailFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.verifyEmailFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      this.router.navigate(['/auth/login']);
    })
  ), { dispatch: false });

  /**
   * Effet register
   * @method register$
   *
   * @description
   * Effet register pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
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

  /**
   * Effet registerSuccess
   * @method registerSuccess$
   *
   * @description
   * Effet registerSuccess pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public registerSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.registerSuccess),
    tap(({ user }: { user: User }) => {
      this.router.navigate(['/auth/login']);
    })
  ), { dispatch: false });

  /**
   * Effet registerFailure
   * @method registerFailure$
   *
   * @description
   * Effet registerFailure pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public registerFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.registerFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });

  /**
   * Effet logout
   * @method logout$
   *
   * @description
   * Effet logout pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public logout$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.logout),
    map(() => AuthActions.logoutSuccess())
  ));

  /**
   * Effet logoutSuccess
   * @method logoutSuccess$
   *
   * @description
   * Effet logoutSuccess pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public logoutSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.logoutSuccess),
    tap(() => {
      this.localStorageService.clear(REFRESH_TOKEN_KEY);
      this.router.navigate(['/auth/login']);
    })
  ), { dispatch: false });

  /**
   * Effet logoutFailure
   * @method logoutFailure$
   *
   * @description
   * Effet logoutFailure pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public logoutFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.logoutFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });

  /**
   * Effet refresh
   * @method refresh$
   *
   * @description
   * Effet refresh pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
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

  /**
   * Effet refreshSuccess
   * @method refreshSuccess$
   *
   * @description
   * Effet refreshSuccess pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
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

  /**
   * Effet refreshFailure
   * @method refreshFailure$
   *
   * @description
   * Effet refreshFailure pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
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

  /**
   * Effet fetchMeSuccess
   * @method fetchMeSuccess$
   *
   * @description
   * Effet fetchMeSuccess pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public fetchMeSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.fetchMeSuccess),
    tap(({ user }: { user: User }) => {
      if (!user.emailVerifiedAt) {
        this.router.navigate(['/auth/email-verification'], {
          queryParams: {
            email: user.email
          }
        });
      }
    })
  ), { dispatch: false });

  /**
   * Effet fetchMeFailure
   * @method fetchMeFailure$
   *
   * @description
   * Effet fetchMeFailure pour se connecter
   *
   * @access public
   * @memberof AuthEffects
   * @since 1.0.0
   *
   * @returns {Observable<HttpResponse<ApiReponse<User & { token: JwtToken }>>>} - Retourne la réponse de l'API
   */
  public fetchMeFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.fetchMeFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });
  //#endregion
}
