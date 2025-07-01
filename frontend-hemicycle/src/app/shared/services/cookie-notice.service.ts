import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CookieConsentService } from "@core/services/cookie-consent.service";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { CookieNoticeDialogComponent, type CookieNoticeDialogData } from "@shared/dialogs/cookie-notice-dialog/cookie-notice-dialog.component";
import { CookiePreferenceDialogComponent, type CookiePreferenceDialogData } from "@shared/dialogs/cookie-preference-dialog/cookie-preference-dialog.component";
import { CookieNoticeDialogHeaderComponent } from "@shared/dialogs/cookie-notice-dialog/cookie-notice-dialog-header/cookie-notice-dialog-header.component";
import { CookieNoticeDialogContentComponent } from "@shared/dialogs/cookie-notice-dialog/cookie-notice-dialog-content/cookie-notice-dialog-content.component";
import { CookieNoticeDialogFooterComponent } from "@shared/dialogs/cookie-notice-dialog/cookie-notice-dialog-footer/cookie-notice-dialog-footer.component";
import { CookiePreferenceDialogHeaderComponent } from "@shared/dialogs/cookie-preference-dialog/cookie-preference-dialog-header/cookie-preference-dialog-header.component";
import { CookiePreferenceDialogContentComponent } from "@shared/dialogs/cookie-preference-dialog/cookie-preference-dialog-content/cookie-preference-dialog-content.component";
import { CookiePreferenceDialogFooterComponent } from "@shared/dialogs/cookie-preference-dialog/cookie-preference-dialog-footer/cookie-preference-dialog-footer.component";
import { cp } from "fs";
import { isPlatformBrowser } from "@angular/common";


@Injectable({ providedIn: 'root' })
export class CookieNoticeService {
  //#region Propriétés
  /**
   * Propriété dialogService
   * @readonly
   *
   * @description
   * Service permettant de gérer
   * les dialogues
   *
   * @access private
   * @memberof CookieNoticeService
   * @since 1.0.0
   *
   * @type {DialogService} dialogService
   */
  private readonly dialogService: DialogService =
    inject<DialogService>(DialogService);

  /**
   * Propriété cookieConsentService
   * @readonly
   *
   * @description
   * Service permettant de gérer
   * les cookies
   *
   * @access private
   * @memberof CookieNoticeService
   * @since 1.0.0
   *
   * @type {CookieConsentService} cookieConsentService
   */
  private readonly cookieConsentService: CookieConsentService =
    inject<CookieConsentService>(CookieConsentService);

  /**
   * Propriété noticeDialogRef
   *
   * @description
   * Référence du dialogue de la bannière
   *
   * @access private
   * @memberof CookieNoticeService
   * @since 1.0.0
   *
   * @type {DynamicDialogRef<CookieNoticeDialogComponent> | null} noticeDialogRef
   */
  private noticeDialogRef: DynamicDialogRef<CookieNoticeDialogComponent> | null = null;

  /**
   * Propriété preferenceDialogRef
   *
   * @description
   * Référence du dialogue des préférences
   *
   * @access private
   * @memberof CookieNoticeService
   * @since 1.0.0
   *
   * @type {DynamicDialogRef<CookiePreferenceDialogComponent> | null} preferenceDialogRef
   */
  private preferenceDialogRef: DynamicDialogRef<CookiePreferenceDialogComponent> | null = null;
  //#endregion

  //#region Méthodes
  /**
   * Méthode openNoticeDialog
   * @method openNoticeDialog
   *
   * @description
   * Ouvre le dialogue de la bannière
   *
   * @access public
   * @memberof CookieNoticeService
   * @since 1.0.0
   *
   * @returns {DynamicDialogRef<CookieNoticeDialogComponent>} Référence du dialogue
   */
  public openNoticeDialog(): DynamicDialogRef<CookieNoticeDialogComponent> {
    /**
     * Données du dialogue
     * @const data
     *
     * @description
     * Données du dialogue de la bannière
     *
     * @type {CookieNoticeDialogData} data
     */
    const data: CookieNoticeDialogData = {};

    /**
     * Configuration du dialogue
     * @const config
     *
     * @description
     * Configuration du dialogue de la bannière
     *
     * @type {DynamicDialogConfig<CookieNoticeDialogData>} config
     */
    const config: DynamicDialogConfig<CookieNoticeDialogData> = {
      styleClass: 'w-[500px] max-w-full',
      position: 'bottomleft',
      closeOnEscape: true,
      modal: true,
      closable: true,
      dismissableMask: true,
      data: data,
      templates: {
        header: CookieNoticeDialogHeaderComponent,
        content: CookieNoticeDialogContentComponent,
        footer: CookieNoticeDialogFooterComponent
      },
    };

    // Ouvre le dialogue de la bannière
    this.noticeDialogRef = this.dialogService.open<
      CookieNoticeDialogComponent,
      CookieNoticeDialogData
    >(CookieNoticeDialogComponent, config);

    return this.noticeDialogRef;
  }

  /**
   * Méthode closeNoticeDialog
   * @method closeNoticeDialog
   *
   * @description
   * Ferme le dialogue de la bannière
   *
   * @access public
   * @memberof CookieNoticeService
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public closeNoticeDialog(): void {
    if (this.noticeDialogRef === null) return;
    this.noticeDialogRef.close();
  }

  /**
   * Méthode openPreferenceDialog
   * @method openPreferenceDialog
   *
   * @description
   * Ouvre le dialogue des préférences
   *
   * @access public
   * @memberof CookieNoticeService
   * @since 1.0.0
   *
   * @returns {DynamicDialogRef<CookiePreferenceDialogComponent>} Référence du dialogue
   */
  public openPreferenceDialog(): DynamicDialogRef<CookiePreferenceDialogComponent> {
    /**
     * Données du dialogue
     * @const data
     *
     * @description
     * Données du dialogue des préférences
     *
     * @type {CookiePreferenceDialogData} data
     */
    const data: CookiePreferenceDialogData = {};

    /**
     * Configuration du dialogue
     * @const config
     *
     * @description
     * Configuration du dialogue des préférences
     *
     * @type {DynamicDialogConfig<CookiePreferenceDialogData>} config
     */
    const config: DynamicDialogConfig<CookiePreferenceDialogData> = {
      styleClass: 'w-[500px] max-w-full',
      position: 'center',
      closeOnEscape: true,
      modal: true,
      closable: true,
      dismissableMask: true,
      data: data,
      templates: {
        header: CookiePreferenceDialogHeaderComponent,
        content: CookiePreferenceDialogContentComponent,
        footer: CookiePreferenceDialogFooterComponent
      },
    };

    // Ouvre le dialogue des préférences
    this.preferenceDialogRef = this.dialogService.open<
      CookiePreferenceDialogComponent,
      CookiePreferenceDialogData
    >(CookiePreferenceDialogComponent, config);

    return this.preferenceDialogRef;
  }

  /**
   * Méthode closePreferenceDialog
   * @method closePreferenceDialog
   *
   * @description
   * Ferme le dialogue des préférences
   *
   * @access public
   * @memberof CookieNoticeService
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public closePreferenceDialog(): void {
    if (this.preferenceDialogRef === null) return;
    this.preferenceDialogRef.close();
  }
  //#endregion
}
