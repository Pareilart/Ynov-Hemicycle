import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TitleStrategy as BaseTitleStrategy, RouterStateSnapshot } from "@angular/router";
import { environment } from "@environments/environment";

/**
 * Stratégie TitleStrategy
 * @class TitleStrategy
 *
 * @description
 * Stratégie TitleStrategy pour le titre de la page
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Injectable({ providedIn: 'root' })
export class TitleStrategy extends BaseTitleStrategy {
  //#region Propriétés
  /**
   * Propriété appName
   * @readonly
   * @static
   *
   * @description
   * Nom de l'application
   *
   * @access private
   * @memberof TitleStrategy
   * @since 1.0.0
   *
   * @type {string} appName
   */
  private static readonly appName: string = environment.application.name;

  /**
   * Propriété separator
   * @readonly
   * @static
   *
   * @description
   * Séparateur du titre de la page
   *
   * @access private
   * @memberof TitleStrategy
   * @since 1.0.0
   *
   * @type {string} separator
   */
  private static readonly separator: string = '-';

  /**
   * Propriété titleService
   * @readonly
   *
   * @description
   * Service TitleService
   *
   * @access private
   * @memberof TitleStrategy
   * @since 1.0.0
   *
   * @type {Title} titleService
   */
  private readonly titleService: Title =
    inject<Title>(Title);
  //#endregion

  //#region Méthodes
  /**
   * Méthode updateTitle
   * @method updateTitle
   * @override
   *
   * @description
   * Méthode updateTitle pour le titre de la page
   *
   * @access public
   * @memberof TitleStrategy
   * @since 1.0.0
   *
   * @param {RouterStateSnapshot} state - État de la route
   *
   * @return {void} - Retourne void
   */
  public override updateTitle(state: RouterStateSnapshot): void {
    const baseTitle: string | undefined = this.buildTitle(state);

    if (!baseTitle) this.titleService.setTitle(TitleStrategy.appName);
    else this.titleService.setTitle(`${baseTitle} ${TitleStrategy.separator} ${TitleStrategy.appName}`);
  }
  //#endregion
}
