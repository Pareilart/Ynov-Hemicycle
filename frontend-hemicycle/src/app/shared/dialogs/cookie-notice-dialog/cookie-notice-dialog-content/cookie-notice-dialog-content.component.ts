import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CookieNoticeDialogComponent, type CookieNoticeDialogData } from '@shared/dialogs/cookie-notice-dialog/cookie-notice-dialog.component';
import { ButtonModule } from 'primeng/button';
import { CookieNoticeService } from '@app/shared/services/cookie-notice.service';
import { CookieConsentService } from '@app/core/services/cookie-consent.service';

@Component({
  selector: 'app-cookie-notice-dialog-content',
  imports: [ButtonModule],
  templateUrl: './cookie-notice-dialog-content.component.html',
  styleUrl: './cookie-notice-dialog-content.component.css'
})
export class CookieNoticeDialogContentComponent {
  //#region Propriétés
  /**
   * Propriété dialogRef
   * @readonly
   *
   * @description
   * Référence du dialogue
   *
   * @access public
   * @memberof CookieNoticeDialogContentComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogRef<CookieNoticeDialogComponent>} dialogRef
   */
  public readonly dialogRef: DynamicDialogRef<CookieNoticeDialogComponent> =
    inject<DynamicDialogRef<CookieNoticeDialogComponent>>(DynamicDialogRef);

  /**
   * Propriété dialogConfig
   * @readonly
   *
   * @description
   * Configuration du dialogue
   *
   * @access public
   * @memberof CookieNoticeDialogContentComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogConfig<CookieNoticeDialogData>} dialogConfig
   */
  public readonly dialogConfig: DynamicDialogConfig<CookieNoticeDialogData> =
    inject<DynamicDialogConfig<CookieNoticeDialogData>>(DynamicDialogConfig);

  /**
   * Propriété cookieNoticeService
   * @readonly
   *
   * @description
   * Service de gestion des cookies
   *
   * @access private
   * @memberof CookieNoticeDialogContentComponent
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
   * Service de gestion des cookies
   *
   * @access private
   * @memberof CookieNoticeDialogContentComponent
   * @since 1.0.0
   *
   * @type {CookieConsentService} cookieConsentService
   */
  private readonly cookieConsentService: CookieConsentService =
    inject<CookieConsentService>(CookieConsentService);
  //#endregion

  //#region Méthodes
  /**
   * Méthode onAcceptAll
   * @method onAcceptAll
   *
   * @description
   * Méthode onAcceptAll pour accepter
   * tous les cookies.
   *
   * @access public
   * @memberof CookieNoticeDialogContentComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onAcceptAll(): void {
    this.cookieConsentService.acceptAll();
    this.dialogRef.close();
  }

  /**
   * Méthode onPreference
   * @method onPreference
   *
   * @description
   * Méthode onPreference pour ouvrir
   * le dialogue de préférence.
   *
   * @access public
   * @memberof CookieNoticeDialogContentComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onPreference(): void {
    this.cookieNoticeService.openPreferenceDialog();
    this.dialogRef.close();
  }

  /**
   * Méthode onRejectAll
   * @method onRejectAll
   *
   * @description
   * Méthode onRejectAll pour refuser
   * tous les cookies.
   *
   * @access public
   * @memberof CookieNoticeDialogContentComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onRejectAll(): void {
    this.cookieConsentService.rejectAll();
    this.dialogRef.close();
  }
  //#endregion
}
