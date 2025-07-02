import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, Router, RouterStateSnapshot } from "@angular/router";

/**
 * Resolver AuthEmail2FAResolver
 * @class AuthEmail2FAResolver
 *
 * @description
 * Resolver pour obtenir l'email correspondant
 * à un paramètre de requête donné
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see https://angular.dev/api/router/Resolve
 */
@Injectable({ providedIn: 'root' })
export class AuthEmail2FAResolver implements Resolve<string> {
  //#region Propriétés
  /**
   * Propriété router
   * @readonly
   *
   * @description
   * Router injecté
   *
   * @access private
   * @memberof AuthEmail2FAResolver
   * @since 1.0.0
   *
   * @type {Router} router
   */
  private readonly router: Router =
    inject<Router>(Router);
  //#endregion

  //#region Méthodes
  /**
   * Méthode resolve
   * @method resolve
   *
   * @description
   * Permet d'obtenir l'email correspondant
   * à un code donné
   *
   * @access public
   * @memberof AuthEmail2FAResolver
   * @since 1.0.0
   *
   * @param {ActivatedRouteSnapshot} route Route actuelle
   * @param {RouterStateSnapshot} state État de la route
   *
   * @returns {MaybeAsync<string>} Email trouvée
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<string | RedirectCommand> {
    const email: string | null = route.queryParamMap.get('email');

    if (!email) {
      return new RedirectCommand(this.router.createUrlTree(['/auth/login']));
    }

    return email;
  }
  //#endregion
}


