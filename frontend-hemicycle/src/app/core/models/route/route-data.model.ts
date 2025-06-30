import { Data as AngularRouteData } from "@angular/router";
import { RouteMeta } from "@core/models/route/route-meta.model";

/**
 * Modèle RouteData
 * @interface RouteData
 *
 * @description
 * Représente les données d'une route
 *
 * @version 1.0.0
 *
 * @property {RouteMeta} meta - Métadonnées de la route
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type RouteData = {
  //#region Propriétés
  /**
   * Propriété meta
   * @readonly
   *
   * @description
   * Métadonnées de la route
   *
   * @memberof RouteData
   * @since 1.0.0
   *
   * @type {RouteMeta} meta
   */
  readonly meta?: RouteMeta;

  /**
   * Propriété hero
   * @readonly
   *
   * @description
   * Indique si la route est une page d'accueil
   *
   * @memberof RouteData
   * @since 1.0.0
   *
   * @type {boolean} hero
   */
  readonly hero?: boolean;
  //#endregion
} & AngularRouteData;
