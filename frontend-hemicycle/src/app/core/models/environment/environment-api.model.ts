
/**
 * Modèle EnvironmentApi
 * @interface EnvironmentApi
 *
 * @description
 * Modèle de configuration pour l'API.
 *
 * @version 1.0.0
 *
 * @property {string} name - Nom de l'API
 * @property {string} version - Version de l'API
 * @property {string} url - URL de l'API
 *
 * @example
 * ```typescript
 * const environmentApi: EnvironmentApi = {
 *   name: 'MyApi',
 *   version: '1.0.0',
 *   url: 'https://api.example.com'
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface EnvironmentApi {
  //#region Propriétés
  /**
   * Propriété name
   *
   * @description
   * Nom de l'API
   *
   * @memberof EnvironmentApi
   * @since 1.0.0
   *
   * @type {string} name
   */
  name: string;

  /**
   * Propriété version
   *
   * @description
   * Version de l'API
   *
   * @memberof EnvironmentApi
   * @since 1.0.0
   *
   * @type {string} version
   */
  version: string;

  /**
   * Propriété url
   *
   * @description
   * URL de l'API
   *
   * @memberof EnvironmentApi
   * @since 1.0.0
   *
   * @type {string} url
   */
  url: string;
  //#endregion
}
