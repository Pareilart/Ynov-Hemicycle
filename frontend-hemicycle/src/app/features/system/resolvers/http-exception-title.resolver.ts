import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { HTTP_EXCEPTIONS, HTTPException } from "@features/system/models/http-exception/http-exception.model";

/**
 * Resolver HTTPExceptionTitleResolver
 * @class HTTPExceptionTitleResolver
 *
 * @description
 * Resolver pour obtenir le titre de l'exception
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see https://angular.dev/api/router/Resolve
 */
@Injectable({ providedIn: 'root' })
export class HTTPExceptionTitleResolver implements Resolve<string> {
  //#region Méthodes
  /**
   * Méthode resolve
   * @method resolve
   *
   * @description
   * Permet d'obtenir le titre de l'exception
   *
   * @access public
   * @memberof HTTPExceptionTitleResolver
   * @since 1.0.0
   *
   * @param {ActivatedRouteSnapshot} route Route actuelle
   * @param {RouterStateSnapshot} state État de la route
   *
   * @returns {MaybeAsync<string>} Titre de l'exception
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<string> {
    const code: number = Number(route.paramMap.get('code'));
    const exception: HTTPException | undefined = HTTP_EXCEPTIONS.find(
      (exception: HTTPException) => exception.code === code
    );

    if (!exception) {
      throw new Error('Exception not found');
    }

    return exception.title;
  }
  //#endregion
}

