import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { HTTP_EXCEPTIONS, HTTPException } from "@features/system/models/http-exception/http-exception.model";

/**
 * Resolver HTTPExceptionResolver
 * @class HTTPExceptionResolver
 *
 * @description
 * Resolver pour obtenir l'exception correspondante
 * à un code donné
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see https://angular.dev/api/router/Resolve
 */
@Injectable({ providedIn: 'root' })
export class HTTPExceptionResolver implements Resolve<HTTPException> {
  //#region Méthodes
  /**
   * Méthode resolve
   * @method resolve
   *
   * @description
   * Permet d'obtenir l'exception correspondante
   * à un code donné
   *
   * @access public
   * @memberof HTTPExceptionResolver
   * @since 1.0.0
   *
   * @param {ActivatedRouteSnapshot} route Route actuelle
   * @param {RouterStateSnapshot} state État de la route
   *
   * @returns {MaybeAsync<HTTPException>} Exception trouvée
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<HTTPException> {
    const code: number = Number(route.paramMap.get('code'));
    const exception: HTTPException | undefined = HTTP_EXCEPTIONS.find(
      (exception: HTTPException) => exception.code === code
    );

    if (!exception) {
      throw new Error('Exception not found');
    }

    return exception;
  }
  //#endregion
}
