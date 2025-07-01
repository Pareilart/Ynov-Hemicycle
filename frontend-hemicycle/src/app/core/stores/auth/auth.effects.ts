import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { AuthService } from "@app/core/services/api/auth.service";
import { Router } from "@angular/router";
import * as AuthActions from "@core/stores/auth/auth.actions";
import { UserCredentials } from "@app/core/models/user/user-credentials.model";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { ApiReponse } from "@app/core/models/api/api-response.model";
import { User } from "@app/core/models/user/user.model";
import { JwtToken } from "@app/core/models/jwt/jwt-token.model";
import { StoreOperationStatus } from "@app/core/models/store/store-operation-status.model";
import { UserRegistration } from "@app/core/models/user/user-registration.model";

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
      this.router.navigate(['/auth/login']);
    })
  ), { dispatch: false });

  public logoutFailure$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.logoutFailure),
    tap(({ status }: { status: StoreOperationStatus }) => {
      console.log(status);
    })
  ), { dispatch: false });
  //#endregion
}
