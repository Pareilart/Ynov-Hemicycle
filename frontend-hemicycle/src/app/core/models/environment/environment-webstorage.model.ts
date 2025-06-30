/**
 * Modèle EnvironmentWebStorage
 * @interface EnvironmentWebStorage
 *
 * @description
 * Modèle de configuration pour la gestion du stockage
 * en localStorage.
 *
 * @version 1.0.0
 *
 * @property {string} prefix - Prefixe de la clé
 * @property {string} separator - Séparateur de la clé
 * @property {boolean} caseSensitive - Sensibilité à la casse
 *
 * @example
 * ```typescript
 * const environmentWebStorage: EnvironmentWebStorage = {
 *   prefix: 'env',
 *   separator: '_',
 *   caseSensitive: false
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface EnvironmentWebStorage {
  //#region Propriétés
  /**
   * Propriété prefix
   *
   * @description
   * Prefixe de la clé
   *
   * @memberof EnvironmentWebStorage
   * @since 1.0.0
   *
   * @type {string} prefix
   */
  prefix: string;

  /**
   * Propriété separator
   *
   * @description
   * Séparateur de la clé
   *
   * @memberof EnvironmentWebStorage
   * @since 1.0.0
   *
   * @type {string} separator
   */
  separator: string;

  /**
   * Propriété caseSensitive
   *
   * @description
   * Sensibilité à la casse
   *
   * @memberof EnvironmentWebStorage
   * @since 1.0.0
   *
   * @type {boolean} caseSensitive
   */
  caseSensitive: boolean;
  //#endregion
}
