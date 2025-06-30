import { EnvironmentApp } from "@core/models/environment/environment-app.model";
import { EnvironmentWebStorage } from "@core/models/environment/environment-webstorage.model";
import { EnvironmentApi } from "@core/models/environment/environment-api.model";
import { EnvironmentMaintenance } from "@core/models/environment/environment-maintenance.model";

/**
 * Modèle Environment
 * @interface Environment
 *
 * @description
 * Modèle de configuration de l'environnement
 * de l'application.
 *
 * @version 1.0.0
 *
 * @property {boolean} production - Indique si l'application est en mode production
 * @property {EnvironmentApp} application - Configuration de l'application
 * @property {EnvironmentWebStorage} storage - Configuration du stockage
 *
 * @example
 * ```typescript
 * const environment: Environment = {
 *   production: false,
 *   application: {
 *     name: 'MyApp',
 *     version: '1.0.0',
 *     authors: [
 *       {
 *         name: 'John Doe',
 *         email: 'john.doe@example.com',
 *         role: 'Developer'
 *       }
 *     ]
 *   },
 *   maintenance: {
 *     enabled: false,
 *     message: 'Maintenance en cours'
 *   },
 *   storage: {
 *     prefix: 'env',
 *     separator: '_',
 *     caseSensitive: false
 *   },
 *   apis: [
 *     {
 *       name: 'MyApi',
 *       version: '1.0.0',
 *       url: 'https://api.example.com'
 *     }
 *   ]
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface Environment {
  //#region Propriétés
  /**
   * Propriété production
   *
   * @description
   * Indique si l'application est en mode production
   *
   * @memberof Environment
   * @since 1.0.0
   *
   * @type {boolean} production
   */
  production: boolean;

  /**
   * Propriété application
   *
   * @description
   * Configuration de l'application
   *
   * @memberof Environment
   * @since 1.0.0
   *
   * @type {EnvironmentApp} application
   */
  application: EnvironmentApp;

  /**
   * Propriété maintenance
   *
   * @description
   * Configuration de la maintenance
   *
   * @memberof Environment
   * @since 1.0.0
   *
   * @type {EnvironmentMaintenance} maintenance
   */
  maintenance: EnvironmentMaintenance;

  /**
   * Propriété storage
   *
   * @description
   * Configuration du stockage
   *
   * @memberof Environment
   * @since 1.0.0
   *
   * @type {EnvironmentWebStorage} storage
   */
  storage: EnvironmentWebStorage;

  /**
   * Propriété apis
   *
   * @description
   * Configuration des APIs
   *
   * @memberof Environment
   * @since 1.0.0
   *
   * @type {Record<string, EnvironmentApi>} apis
   */
  apis: Record<string, EnvironmentApi>;
  //#endregion
}
