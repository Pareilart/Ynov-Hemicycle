import { afterRenderEffect, Component, inject } from '@angular/core';
import { CookieConsentService } from '@app/core/services/cookie-consent.service';
import { CookieNoticeService } from '@app/shared/services/cookie-notice.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-cookie-settings',
  imports: [
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './cookie-settings.component.html',
  styleUrl: './cookie-settings.component.css',
})
export class CookieSettingsComponent {
  //#region Propriétés
  /**
   * Propriété cookieNoticeService
   * @readonly
   *
   * @description
   * Service de la bannière de cookies
   *
   * @access private
   * @memberof CookieSettingsComponent
   * @since 1.0.0
   *
   * @type {CookieNoticeService} cookieNoticeService
   */
  private readonly cookieNoticeService: CookieNoticeService =
    inject<CookieNoticeService>(CookieNoticeService);

  /**
   * Propriété cookieConsentService
   * @readonly
   *
   * @description
   * Service permettant de gérer
   * les consentements de cookies
   *
   * @access private
   * @memberof CookieSettingsComponent
   * @since 1.0.0
   *
   * @type {CookieConsentService} cookieConsentService
   */
  private readonly cookieConsentService: CookieConsentService =
    inject<CookieConsentService>(CookieConsentService);
  //#endregion

  //#region Constructeur
  /**
   * Constructeur
   * @constructor
   *
   * @description
   * Constructeur de la classe
   * CookieSettingsComponent
   *
   * @access public
   * @memberof CookieSettingsComponent
   * @since 1.0.0
   */
  public constructor() {
    afterRenderEffect(() => {
      if (this.cookieConsentService.hasConsentGiven()) return;
      this.openNoticeDialog();
    });
  }
  //#endregion

  //#region Méthodes
  /**
   * Méthode openNoticeDialog
   *
   * @description
   * Méthode permettant d'ouvrir
   * le dialog de la bannière de cookies
   *
   * @access public
   * @memberof CookieSettingsComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public openNoticeDialog(): void {
    this.cookieNoticeService.openNoticeDialog();
  }

  /**
   * Méthode openPreferenceDialog
   *
   * @description
   * Méthode permettant d'ouvrir
   * le dialog de paramètres de cookies
   *
   * @access public
   * @memberof CookieSettingsComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public openPreferenceDialog(): void {
    this.cookieNoticeService.openPreferenceDialog();
  }
  //#endregion
}
