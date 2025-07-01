import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthState } from "@core/stores/auth/auth.state";
import { Store } from "@ngrx/store";
import { selectIsAuthenticated } from "../stores/auth/auth.selectors";
import { map, take } from "rxjs";

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
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true;
        }
        this.router.navigate(["/auth/login"], {
          queryParams: {
            returnUrl: state.url
          }
        });

        return false;
      })
    )
  }
  //#endregion
}
