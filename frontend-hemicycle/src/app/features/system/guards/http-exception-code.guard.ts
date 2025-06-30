import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RedirectCommand, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { HTTPException, HTTP_EXCEPTIONS } from "@features/system/models/http-exception/http-exception.model";

/**
 * Guard HTTPExceptionCodeGuard
 * @class HTTPExceptionCodeGuard
 *
 * @description
 * Guard pour vérifier si le code est valide
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see https://angular.dev/api/router/CanActivate
 */
@Injectable({ providedIn: 'root' })
export class HTTPExceptionCodeGuard implements CanActivate {
  //#region Propriétés
  /**
   * Propriété validCodes
   * @readonly
   *
   * @description
   * Codes valides
   *
   * @access private
   * @memberof HTTPExceptionCodeGuard
   * @since 1.0.0
   *
   * @type {number[]} validCodes
   */
  private readonly validCodes: number[] =
    HTTP_EXCEPTIONS.map((exception: HTTPException) => exception.code);

  /**
   * Propriété NOT_FOUND_PATH
   * @readonly
   * @static
   *
   * @description
   * Constante NOT_FOUND_PATH pour stocker le chemin de la page 404
   *
   * @access private
   * @memberof HTTPExceptionCodeGuard
   * @since 1.0.0
   *
   * @type {string} NOT_FOUND_PATH
   */
  private static readonly NOT_FOUND_PATH: string = '404';

  /**
   * Propriété router
   * @readonly
   *
   * @description
   * Service de navigation
   *
   * @access private
   * @memberof HTTPExceptionCodeGuard
   * @since 1.0.0
   *
   * @type {Router} router
   */
  private readonly router: Router =
    inject<Router>(Router);
  //#endregion

  //#region Méthodes
  //#region Méthodes
  /**
   * Méthode canActivate
   * @method canActivate
   *
   * @description
   * Permet de vérifier si le code est valide
   *
   * @access public
   * @memberof HTTPExceptionCodeGuard
   * @since 1.0.0
   *
   * @param {ActivatedRouteSnapshot} route Route actuelle
   * @param {RouterStateSnapshot} state État de la route
   *
   * @returns {MaybeAsync<GuardResult>} Résultat de la vérification
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    /**
     * Constante code
     * @const code
     *
     * @description
     * Constante code pour stocker le code
     *
     * @type {number} code
     */
    const code: number = Number(route.paramMap.get('code'));

    // Si le code n'est pas valide
    if (!this.validCodes.includes(code)) {
      return this.redirectToNotFound();
    }

    return true;
  }

  /**
   * Méthode redirectToNotFound
   * @method redirectToNotFound
   *
   * @description
   * Permet de rediriger vers la page 404
   *
   * @access private
   * @memberof HTTPExceptionCodeGuard
   * @since 1.0.0
   *
   * @returns {RedirectCommand} Commande de redirection
   */
  private redirectToNotFound(): RedirectCommand {
    const redirectTo: UrlTree = this.router.parseUrl(
      HTTPExceptionCodeGuard.NOT_FOUND_PATH
    );

    return new RedirectCommand(redirectTo, {
      replaceUrl: true
    });
  }
  //#endregion
}

