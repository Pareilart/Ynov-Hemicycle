import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { fetchAllLaws } from "@app/core/stores/law/law.actions";
import { selectAllLaws } from "@app/core/stores/law/law.selectors";
import { LawState } from "@app/core/stores/law/law.state";
import { Law } from "@core/models/law/law.model";
import { Store } from "@ngrx/store";
import { catchError, filter, first, tap } from 'rxjs/operators';

/**
 * Resolver LegislationLawsResolver
 * @class LegislationLawsResolver
 *
 * @description
 * Resolver pour obtenir une liste de lois
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see https://angular.dev/api/router/Resolve
 */
@Injectable({ providedIn: 'root' })
export class LegislationLawsResolver implements Resolve<Law[]> {
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
  private readonly router: Router =
    inject<Router>(Router);

  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Store injecté
   *
   * @access private
   * @memberof LegislationLawsResolver
   * @since 1.0.0
   *
   * @type {Store<LawState>} store
   */
  private readonly store: Store<LawState> =
    inject<Store<LawState>>(Store<LawState>);
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
   * @returns {Law[]} La loi trouvée
   */
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<Law[]> {
    this.store.dispatch(fetchAllLaws());
    return this.store.select(selectAllLaws).pipe(
      tap((laws) => console.log(laws))
    );
  }
}
