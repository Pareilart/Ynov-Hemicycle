import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, GuardResult, MaybeAsync, RedirectCommand, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { MaintenanceService } from "@core/services/maintenance.service";

/**
 * Guard MaintenanceGuard
 * @class MaintenanceGuard
 *
 * @description
 * Guard permettant de gérer l'accès à la page
 * de maintenance.
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Injectable({ providedIn: "root" })
export class MaintenanceGuard implements CanActivate {
  //#region Propriétés
  /**
   * Propriété maintenanceService
   * @readonly
   *
   * @description
   * Service de maintenance
   *
   * @access private
   * @memberof MaintenanceGuard
   * @since 1.0.0
   *
   * @type {MaintenanceService} maintenanceService
   */
  private readonly maintenanceService: MaintenanceService =
    inject<MaintenanceService>(MaintenanceService);

  /**
   * Propriété router
   * @readonly
   *
   * @description
   * Service de navigation
   *
   * @access private
   * @memberof MaintenanceGuard
   * @since 1.0.0
   *
   * @type {Router} router
   */
  private readonly router: Router =
    inject<Router>(Router);

  /**
   * Propriété MAINTENANCE_PATH
   * @readonly
   * @static
   *
   * @description
   * Constante MAINTENANCE_PATH pour stocker le chemin de la page de maintenance
   *
   * @access private
   * @memberof MaintenanceGuard
   * @since 1.0.0
   *
   * @type {string} MAINTENANCE_PATH
   */
  private static readonly MAINTENANCE_PATH: string = '/system/maintenance';

  /**
   * Propriété HOME_PATH
   * @readonly
   * @static
   *
   * @description
   * Constante HOME_PATH pour stocker le chemin de la page d'accueil
   *
   * @access private
   * @memberof MaintenanceGuard
   * @since 1.0.0
   *
   * @type {string} HOME_PATH
   */
  private static readonly HOME_PATH: string = '/';
  //#endregion

  //#region Méthodes
  /**
   * Méthode canActivate
   * @method canActivate
   *
   * @description
   * Méthode canActivate pour le guard de maintenance
   *
   * @access public
   * @memberof MaintenanceGuard
   * @since 1.0.0
   *
   * @param {ActivatedRouteSnapshot} route - Route actuelle
   * @param {RouterStateSnapshot} state - État de la route
   *
   * @returns {boolean} - Retourne true si la maintenance est activée, false sinon
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    /**
     * Constante isMaintenancePage
     * @const isMaintenancePage
     *
     * @description
     * Constante isMaintenancePage pour stocker le fait que la page de maintenance est activée
     *
     * @type {boolean} isMaintenancePage
     */
    const isMaintenancePage: boolean = state.url.includes(
      MaintenanceGuard.MAINTENANCE_PATH
    );

    // Si la page de maintenance est activée et que la maintenance est désactivée
    if (isMaintenancePage && this.maintenanceService.isDisabled()) {
      return this.redirectToHome();
    }

    // Si la maintenance est activée
    if (this.maintenanceService.isEnabled()) {
      return this.redirectToMaintenance(state.url);
    }

    return true;
  }

  /**
   * Méthode redirectToHome
   * @method redirectToHome
   *
   * @description
   * Méthode redirectToHome pour rediriger vers la page d'accueil
   *
   * @access private
   * @memberof MaintenanceGuard
   * @since 1.0.0
   *
   * @returns {RedirectCommand} - Retourne un RedirectCommand
   */
  private redirectToHome(): RedirectCommand {
    /**
     * Constante redirectTo
     * @const redirectTo
     *
     * @description
     * Constante redirectTo pour stocker l'URL de redirection
     *
     * @type {UrlTree} redirectTo
     */
    const redirectTo: UrlTree = this.router.parseUrl(
      MaintenanceGuard.HOME_PATH
    );

    // Commande de redirection
    return new RedirectCommand(redirectTo, {
      replaceUrl: true
    });
  }

  /**
   * Méthode redirectToMaintenance
   * @method redirectToMaintenance
   *
   * @description
   * Méthode redirectToMaintenance pour rediriger vers la page de maintenance
   *
   * @access private
   * @memberof MaintenanceGuard
   * @since 1.0.0
   *
   * @param {string} returnUrl - URL de retour
   *
   * @returns {RedirectCommand} - Retourne un RedirectCommand
   */
  private redirectToMaintenance(returnUrl?: string): RedirectCommand {
    /**
     * Constante redirectTo
     * @const redirectTo
     *
     * @description
     * Constante redirectTo pour stocker l'URL de redirection
     *
     * @type {UrlTree} redirectTo
     */
    const redirectTo: UrlTree = this.router.createUrlTree([
      MaintenanceGuard.MAINTENANCE_PATH
    ], { queryParams: { returnUrl: returnUrl } });

    // Commande de redirection
    return new RedirectCommand(redirectTo, {
      replaceUrl: true,
    });
  }
  //#endregion
}
