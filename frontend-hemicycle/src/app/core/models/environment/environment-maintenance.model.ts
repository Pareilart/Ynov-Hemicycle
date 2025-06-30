/**
 * Modèle EnvironmentMaintenance
 * @interface EnvironmentMaintenance
 *
 * @description
 * Modèle de configuration pour la maintenance.
 *
 * @version 1.0.0
 *
 * @property {boolean} enabled - Activer la maintenance
 * @property {string} message - Message de la maintenance
 *
 * @example
 * ```typescript
 * const environmentMaintenance: EnvironmentMaintenance = {
 *   enabled: true,
 *   message: 'Maintenance en cours'
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface EnvironmentMaintenance {
  //#region Propriétés
  /**
   * Propriété enabled
   *
   * @description
   * Activer la maintenance
   *
   * @memberof EnvironmentMaintenance
   * @since 1.0.0
   *
   * @type {boolean} enabled
   */
  enabled: boolean;

  /**
   * Propriété message
   *
   * @description
   * Message de la maintenance
   *
   * @memberof EnvironmentMaintenance
   * @since 1.0.0
   *
   * @type {string} message
   */
  message: string;
  //#endregion
}
