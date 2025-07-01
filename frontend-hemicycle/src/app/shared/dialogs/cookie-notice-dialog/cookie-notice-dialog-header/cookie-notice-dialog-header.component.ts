import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CookieNoticeDialogComponent, type CookieNoticeDialogData } from '@app/shared/dialogs/cookie-notice-dialog/cookie-notice-dialog.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cookie-notice-dialog-header',
  imports: [ButtonModule],
  templateUrl: './cookie-notice-dialog-header.component.html',
  styleUrl: './cookie-notice-dialog-header.component.css',
  host: {
    class: 'w-full'
  }
})
export class CookieNoticeDialogHeaderComponent {
  //#region Propriétés
  /**
   * Propriété dialogRef
   * @readonly
   *
   * @description
   * Référence du dialogue
   *
   * @access public
   * @memberof CookieNoticeDialogHeaderComponent
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
   * @memberof CookieNoticeDialogHeaderComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogConfig<CookieNoticeDialogData>} dialogConfig
   */
  public readonly dialogConfig: DynamicDialogConfig<CookieNoticeDialogData> =
    inject<DynamicDialogConfig<CookieNoticeDialogData>>(DynamicDialogConfig);
  //#endregion

  //#region Méthodes
  /**
   * Méthode onClose
   * @method onClose
   *
   * @description
   * Ferme le dialogue
   *
   * @access public
   * @memberof CookieNoticeDialogHeaderComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onClose(): void {
    this.dialogRef.close();
  }
  //#endregion
}
