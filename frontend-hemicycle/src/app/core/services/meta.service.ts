import { effect, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { Meta, MetaDefinition } from "@angular/platform-browser";
import { inject } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { environment } from "@environments/environment";
import { RouteData } from "@core/models/route/route-data.model";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map } from "rxjs";
import { RouteMeta } from "../models/route/route-meta.model";

/**
 * Service MetaService
 * @class MetaService
 *
 * @description
 * Service MetaService pour la gestion des métadonnées
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Injectable({ providedIn: "root" })
export class MetaService {
  //#region Propriétés
  /**
   * Propriété meta
   * @readonly
   *
   * @description
   * Service Meta pour la gestion des métadonnées
   *
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   *
   * @type {Meta} meta
   */
  private readonly meta: Meta =
    inject<Meta>(Meta);

  /**
   * Propriété router
   * @readonly
   *
   * @description
   * Service Router pour la gestion des routes
   *
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   *
   * @type {Router} router
   */
  private readonly router: Router =
    inject<Router>(Router);

  /**
   * Propriété route
   * @readonly
   *
   * @description
   * Service ActivatedRoute pour la gestion des routes actives
   *
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   *
   * @type {ActivatedRoute} route
   */
  private readonly route: ActivatedRoute =
    inject<ActivatedRoute>(ActivatedRoute);

  /**
   * Propriété tags
   * @readonly
   *
   * @description
   * Tags de métadonnées
   *
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   *
   * @type {WritableSignal<MetaDefinition[]>} tags
   */
  private readonly tags: WritableSignal<MetaDefinition[]> =
    signal<MetaDefinition[]>([]);

  /**
   * Propriété routeChanges
   * @readonly
   *
   * @description
   * Changements de route
   *
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   *
   * @type {Signal<NavigationEnd | undefined>} routeChanges
   */
  private readonly routeChanges: Signal<NavigationEnd | undefined> = toSignal<NavigationEnd>(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
  );
  //#endregion

  //#region Constructeur
  /**
   * Constructeur
   * @constructor
   *
   * @description
   * Permet d'initialiser le service
   *
   * @access public
   * @memberof MetaService
   * @since 1.0.0
   */
  public constructor() {
    /**
     * Effet permettant de collecter les
     * tags de la route
     *
     * @see https://angular.dev/api/core/effect
     */
    effect(() => {
      const routeChanges: NavigationEnd | undefined = this.routeChanges();
      const tags: MetaDefinition[] = this.collectRouteTags();
      this.updateTags(tags);
    });

    /**
     * Effet permettant de mettre à
     * jour les tags dans le DOM
     *
     * @see https://angular.dev/api/core/effect
     */
    effect(() => {
      const tags: MetaDefinition[] = this.tags();

      for (const tag of tags) {
        this.meta.updateTag(tag);
      }
    });
  }
  //#endregion

  //#region Méthodes
  /**
   * Méthode collectRouteTags
   * @method collectRouteTags
   *
   * @description
   * Permet de collecter les tags de la route
   *
   * @access private
   * @memberof MetaService
   * @since 1.0.0
   *
   * @returns {MetaDefinition[]} - Retourne les tags de la route
   */
  private collectRouteTags(): MetaDefinition[] {
    let tags: MetaDefinition[] = [];
    let currentRoute: ActivatedRoute | null = this.route;

    while (currentRoute) {
      const routeData: RouteData = currentRoute.snapshot.data as { meta?: RouteMeta };
      if (routeData.meta) {
        tags = [...tags, ...Object.values(routeData.meta)];
      }
      currentRoute = currentRoute.firstChild;
    }

    return tags;
  }

  /**
   * Méthode updateTags
   * @method updateTags
   *
   * @description
   * Permet de mettre à jour les tags
   *
   * @access public
   * @memberof MetaService
   * @since 1.0.0
   *
   * @param {MetaDefinition[]} tags - Tags de métadonnées
   *
   * @returns {void} - Retourne void
   */
  public updateTags(tags: MetaDefinition[]): void {
    this.tags.update(currentTags => [
      ...currentTags,
      ...tags
    ]);
  }
  //#endregion
}
