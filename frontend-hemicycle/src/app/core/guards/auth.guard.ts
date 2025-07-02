import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthState } from "@core/stores/auth/auth.state";
import { Store } from "@ngrx/store";
import { selectAuthIsAuthenticated, selectAuthState } from "../stores/auth/auth.selectors";
import { filter, first, map, of, switchMap, take } from "rxjs";
import { refresh } from "../stores/auth/auth.actions";
import { LocalStorageService } from "ngx-webstorage";
import { REFRESH_TOKEN_KEY } from "../constants/storage-keys.constant";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  //#region Propriétés
  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Service de stockage
   *
   * @access private
   * @memberof AuthGuard
   * @since 1.0.0
   *
   * @type {Store<AuthState>} store
   */
  private readonly store: Store<AuthState> =
    inject<Store<AuthState>>(Store<AuthState>);

  /**
   * Propriété router
   * @readonly
   *
   * @description
   * Service de navigation
   *
   * @access private
   * @memberof AuthGuard
   * @since 1.0.0
   *
   * @type {Router} router
   */
  private readonly router: Router =
    inject<Router>(Router);

  /**
   * Propriété localStorageService
   * @readonly
   *
   * @description
   * Service de stockage local
   *
   * @access private
   * @memberof AuthGuard
   * @since 1.0.0
   *
   * @type {LocalStorageService} localStorageService
   */
  private readonly localStorageService: LocalStorageService =
    inject<LocalStorageService>(LocalStorageService);
  //#endregion

  //#region Méthodes
  /**
   * Méthode canActivate
   * @method canActivate
   *
   * @description
   * Méthode canActivate pour le guard d'authentification
   *
   * @access public
   * @memberof AuthGuard
   * @since 1.0.0
   *
   * @param {ActivatedRouteSnapshot} route - Route actuelle
   * @param {RouterStateSnapshot} state - État de la route
   *
   * @returns {boolean} - Retourne true si l'utilisateur est authentifié, false sinon
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.store.select(selectAuthState).pipe(
      filter(state => !state.operation.loading || !this.localStorageService.retrieve(REFRESH_TOKEN_KEY)),
      first(),
      switchMap(state => {
        if (state.isAuthenticated) {
          return of(true);
        }

        // Si on a un refresh token, on tente de rafraîchir
        const refreshToken: string | undefined = this.localStorageService.retrieve(REFRESH_TOKEN_KEY);
        if (refreshToken) {
          this.store.dispatch(refresh({ refreshToken }));

          return this.store.select(selectAuthIsAuthenticated).pipe(
            filter(Boolean),
            first(),
            map(() => true)
          );
        }

        return of(this.router.createUrlTree(['/auth/login'], {
          queryParams: { returnUrl: route.url }
        }));
      })
    );
  }
  //#endregion
}
