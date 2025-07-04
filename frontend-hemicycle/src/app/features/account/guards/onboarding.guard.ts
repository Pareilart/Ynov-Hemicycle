import { Injectable, Signal } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult, Router } from "@angular/router";
import { AuthState } from "@app/core/stores/auth/auth.state";
import { Store } from "@ngrx/store";
import { inject } from "@angular/core";
import { selectAuthCurrentUser } from "@app/core/stores/auth/auth.selectors";
import { User } from "@app/core/models/user/user.model";

@Injectable({ providedIn: "root" })
export class OnBoardingGuard implements CanActivate {
  //#region Propriétés
  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Service de stockage
   *
   * @access private
   * @memberof OnBoardingGuard
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
   * @memberof OnBoardingGuard
   * @since 1.0.0
   *
   * @type {Router} router
   */
  private readonly router: Router =
    inject<Router>(Router);

  /**
   * Propriété user
   * @readonly
   *
   * @description
   * Utilisateur connecté
   *
   * @access private
   * @memberof OnBoardingGuard
   * @since 1.0.0
   *
   * @type {Signal<User | null>} user
   */
  private readonly user: Signal<User | null> =
    this.store.selectSignal(selectAuthCurrentUser);
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
   * @memberof OnBoardingGuard
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
    const user: User | null = this.user();
    console.log(user);

    if (user) {
      return true;
    }

    return this.router.createUrlTree(['/']);
  }
  //#endregion
}

