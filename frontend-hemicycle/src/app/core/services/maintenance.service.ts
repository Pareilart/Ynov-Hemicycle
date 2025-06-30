import { computed, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { EnvironmentMaintenance } from "../models/environment/environment-maintenance.model";
import { environment } from "@environments/environment";

/**
 * Service MaintenanceService
 * @class MaintenanceService
 *
 * @description
 * Service pour la gestion de la maintenance
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Injectable({ providedIn: "root" })
export class MaintenanceService {
  //#region Propriétés
  /**
   * Propriété state
   * @readonly
   *
   * @description
   * Signal de la maintenance
   *
   * @access private
   * @memberof MaintenanceService
   * @since 1.0.0
   *
   * @type {WritableSignal<EnvironmentMaintenance>} state
   */
  private readonly state: WritableSignal<EnvironmentMaintenance> =
    signal<EnvironmentMaintenance>(environment.maintenance);

  /**
   * Propriété isEnabled
   * @readonly
   *
   * @description
   * Permet de savoir si la maintenance est activée
   *
   * @access public
   * @memberof MaintenanceService
   * @since 1.0.0
   *
   * @type {Signal<boolean>} isEnabled
   */
  public readonly isEnabled: Signal<boolean> = computed<boolean>(() => {
    const state: EnvironmentMaintenance = this.state();
    return state.enabled;
  });

  /**
   * Propriété isDisabled
   * @readonly
   *
   * @description
   * Permet de savoir si la maintenance est desactivée
   *
   * @access public
   * @memberof MaintenanceService
   * @since 1.0.0
   *
   * @type {Signal<boolean>} isDisabled
   */
  public readonly isDisabled: Signal<boolean> = computed<boolean>(() => {
    const state: EnvironmentMaintenance = this.state();
    return !state.enabled;
  });

  /**
   * Propriété message
   * @readonly
   *
   * @description
   * Signal du message de la maintenance
   *
   * @access public
   * @memberof MaintenanceService
   * @since 1.0.0
   *
   * @type {Signal<string>} message
   */
  public readonly message: Signal<string> = computed<string>(() => {
    const state: EnvironmentMaintenance = this.state();
    return state.message;
  });
  //#endregion

  //#region Méthodes
  /**
   * Méthode enable
   * @method enable
   *
   * @description
   * Active la maintenance
   *
   * @access public
   * @memberof MaintenanceService
   * @since 1.0.0
   *
   * @returns {void} - Retourne void
   */
  public enable(): void {
    this.state.update((state: EnvironmentMaintenance) => ({
      ...state,
      enabled: true
    }));
  }

  /**
   * Méthode disable
   * @method disable
   *
   * @description
   * Désactive la maintenance
   *
   * @access public
   * @memberof MaintenanceService
   * @since 1.0.0
   *
   * @returns {void} - Retourne void
   */
  public disable(): void {
    this.state.update((state: EnvironmentMaintenance) => ({
      ...state,
      enabled: false
    }));
  }
  //#endregion
}
