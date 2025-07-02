import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Law } from "@core/models/law/law.model";

/**
 * Resolver LegislationLawResolver
 * @class LegislationLawResolver
 *
 * @description
 * Resolver pour obtenir une loi
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see https://angular.dev/api/router/Resolve
 */
@Injectable({ providedIn: 'root' })
export class LegislationLawResolver implements Resolve<Law> {
  //#region Propriétés
  /**
   * Propriété router
   * @readonly
   *
   * @description
   * Router injecté
   *
   * @access private
   * @memberof LegislationLawResolver
   * @since 1.0.0
   *
   * @type {Router} router
   */
  public readonly router: Router =
    inject<Router>(Router);
  //#endregion

  //#region Méthodes
  /**
   * Méthode resolve
   * @method resolve
   *
   * @description
   * Permet d'obtenir une loi
   *
   * @access public
   * @memberof LegislationLawResolver
   * @since 1.0.0
   *
   * @param {ActivatedRouteSnapshot} route Route actuelle
   * @param {RouterStateSnapshot} state État de la route
   *
   * @returns {Law} La loi trouvée
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<Law | RedirectCommand> {
    const id: string | null = route.paramMap.get('id');

    if (!id) {
      return new RedirectCommand(this.router.createUrlTree(['/legislation/laws']));
    }

    // TODO: Implémenter la récupération de la loi via API

    const fakeLaw: Law = {
      id: id,
      title: 'Fake Law',
      resume: 'Fake Law Resume',
      content: 'Fake Law Content',
      accountability: 1,
      adopted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return fakeLaw;
  }

}
