import { Route as AngularRoute } from "@angular/router";
import { RouteData } from "@core/models/route/route-data.model";

/**
 * Modèle Route
 * @interface Route
 *
 * @description
 * Représente une route
 *
 * @version 1.0.0
 *
 * @property {RouteData} data - Données de la route
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export interface Route extends AngularRoute {
  //#region Propriétés
  /**
   * Propriété data
   * @readonly
   *
   * @description
   * Données de la route
   *
   * @memberof Route
   * @since 1.0.0
   *
   * @type {RouteData} data
   */
  readonly data?: RouteData;
  //#endregion
};

/**
 * Modèle Routes
 * @type Routes
 *
 * @description
 * Représente un tableau de routes
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type Routes = Route[];
