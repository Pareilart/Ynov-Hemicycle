import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { fetchLaw } from "@app/core/stores/law/law.actions";
import { selectEntities, selectLawById } from "@app/core/stores/law/law.selectors";
import { LawState } from "@app/core/stores/law/law.state";
import { Law } from "@core/models/law/law.model";
import { Store } from "@ngrx/store";
import { catchError, filter, first, map, Observable, of, take, tap, timeout } from "rxjs";

/**
 * Resolver LegislationLawResolver
 * @class LegislationLawResolver
 *
 * @description
 * Resolver pour obtenir une loi spécifique par son ID
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see https://angular.dev/api/router/Resolve
 */
@Injectable({ providedIn: 'root' })
export class LegislationLawResolver implements Resolve<Law | null> {
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
  private readonly router: Router = inject<Router>(Router);

  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Store injecté
   *
   * @access private
   * @memberof LegislationLawResolver
   * @since 1.0.0
   *
   * @type {Store<LawState>} store
   */
  private readonly store: Store<LawState> =
    inject<Store<LawState>>(Store<LawState>);

  /**
   * Propriété LEGISLATION_LAWS_ROUTE
   * @readonly
   *
   * @description
   * Route de la liste des lois
   *
   * @access private
   * @memberof LegislationLawResolver
   * @since 1.0.0
   *
   * @type {string} LEGISLATION_LAWS_ROUTE
   */
  private static readonly LEGISLATION_LAWS_ROUTE: string = '/legislation/laws';
  //#endregion

  //#region Méthodes
  /**
   * Méthode resolve
   * @method resolve
   *
   * @description
   * Permet d'obtenir une loi spécifique par son ID
   *
   * @access public
   * @memberof LegislationLawResolver
   * @since 1.0.0
   *
   * @param {ActivatedRouteSnapshot} route Route actuelle
   * @param {RouterStateSnapshot} state État de la route
   *
   * @returns {Observable<Law | null>} La loi trouvée ou null si non trouvée
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<Law | null | RedirectCommand> {
    const id: string | null = route.paramMap.get('id');

    if (!id) {
      return new RedirectCommand(this.router.createUrlTree([LegislationLawResolver.LEGISLATION_LAWS_ROUTE]));
    }

    return this.store.select(selectLawById(id)).pipe(
      tap((law: Law | undefined) => {
        if (!law) {
          this.store.dispatch(fetchLaw({ id }));
        }
      }),
      filter(Boolean),
      take(1),
      timeout(5000),
      catchError(() => of(new RedirectCommand(this.router.createUrlTree([LegislationLawResolver.LEGISLATION_LAWS_ROUTE]))))
    );
  }
  //#endregion
}
