import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CookieNoticeDialogComponent, type CookieNoticeDialogData } from '@shared/dialogs/cookie-notice-dialog/cookie-notice-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookie-notice-dialog-footer',
  imports: [RouterModule],
  templateUrl: './cookie-notice-dialog-footer.component.html',
  styleUrl: './cookie-notice-dialog-footer.component.css',
  host: { class: 'flex w-full' },
})
export class CookieNoticeDialogFooterComponent {
  //#region Propriétés
  /**
   * Propriété dialogRef
   * @readonly
   *
   * @description
   * Référence du dialogue
   *
   * @access public
   * @memberof CookieNoticeDialogFooterComponent
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
   * @memberof CookieNoticeDialogFooterComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogConfig<CookieNoticeDialogData>} dialogConfig
   */
  public readonly dialogConfig: DynamicDialogConfig<CookieNoticeDialogData> =
    inject<DynamicDialogConfig<CookieNoticeDialogData>>(DynamicDialogConfig);
  //#endregion
}
