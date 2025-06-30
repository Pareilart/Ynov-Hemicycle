import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, MaybeAsync, RouterStateSnapshot } from "@angular/router";

/**
 * Interface CanDeactivateWithUnsavedChanges
 * @interface CanDeactivateWithUnsavedChanges
 *
 * @description
 * Interface permettant de vérifier les
 * changements non sauvegardés
 *
 * @version 1.0.0
 *
 * @example
 * ```typescript
 * const canDeactivateWithUnsavedChanges: CanDeactivateWithUnsavedChanges = {
 *   canDeactivate: () => true
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface CanDeactivateWithUnsavedChanges {
  //#region Méthodes
  /**
   * Méthode canDeactivate
   * @method canDeactivate
   *
   * @description
   * Méthode canDeactivate pour le guard
   * de navigation
   *
   * @access public
   * @memberof CanDeactivateWithUnsavedChanges
   * @since 1.0.0
   *
   * @returns {MaybeAsync<boolean>} - Retourne true si la route est autorisée, false sinon
   */
  canDeactivate(): MaybeAsync<boolean>;
  //#endregion
}

/**
 * Guard UnsavedChangesGuard
 * @class UnsavedChangesGuard
 *
 * @description
 * Guard permettant de gérer les changements non sauvegardés
 * lors de la navigation.
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Injectable({ providedIn: "root" })
export class UnsavedChangesGuard implements CanDeactivate<CanDeactivateWithUnsavedChanges> {
  //#region Méthodes
  /**
   * Méthode canDeactivate
   * @method canDeactivate
   *
   * @description
   * Méthode canDeactivate pour le guard
   * de navigation
   *
   * @access public
   * @memberof UnsavedChangesGuard
   * @since 1.0.0
   *
   * @param {CanDeactivateWithUnsavedChanges} component - Composant à vérifier
   * @param {ActivatedRouteSnapshot} currentRoute - Route actuelle
   * @param {RouterStateSnapshot} currentState - État de la route actuelle
   * @param {RouterStateSnapshot} nextState - État de la route suivante
   *
   * @returns {MaybeAsync<boolean>} - Retourne true si la route est autorisée, false sinon
   */
  public canDeactivate(
    component: CanDeactivateWithUnsavedChanges,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): MaybeAsync<boolean> {
    return component.canDeactivate();
  }
  //#endregion
}
