
import { EnvironmentAppAuthor } from "@core/models/environment/environment-app-author.model";

/**
 * Modèle EnvironmentApp
 * @interface EnvironmentApp
 *
 * @description
 * Modèle de configuration pour l'application.
 *
 * @version 1.0.0
 *
 * @property {string} name - Nom de l'application
 * @property {string} version - Version de l'application
 * @property {EnvironmentAppAuthor[]} authors - Auteurs de l'application
 *
 * @example
 * ```typescript
 * const environmentApp: EnvironmentApp = {
 *   name: 'MyApp',
 *   version: '1.0.0',
 *   authors: [
 *     {
 *       name: 'John Doe',
 *       email: 'john.doe@example.com',
 *       role: 'Developer'
 *     }
 *   ]
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface EnvironmentApp {
  //#region Propriétés
  /**
   * Propriété name
   *
   * @description
   * Nom de l'application
   *
   * @memberof EnvironmentApp
   * @since 1.0.0
   *
   * @type {string} name
   */
  name: string;

  /**
   * Propriété version
   *
   * @description
   * Version de l'application
   *
   * @memberof EnvironmentApp
   * @since 1.0.0
   *
   * @type {string} version
   */
  version: string;

  /**
   * Propriété authors
   *
   * @description
   * Auteurs de l'application
   *
   * @memberof EnvironmentApp
   * @since 1.0.0
   *
   * @type {EnvironmentAppAuthor[]} authors
   */
  authors: EnvironmentAppAuthor[];
  //#endregion
}
