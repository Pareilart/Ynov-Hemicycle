import { Component, inject } from '@angular/core';
import { CookiePreferenceDialogComponent, type CookiePreferenceDialogData } from '../cookie-preference-dialog.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookie-preference-dialog-footer',
  imports: [
    RouterModule
  ],
  templateUrl: './cookie-preference-dialog-footer.component.html',
  styleUrl: './cookie-preference-dialog-footer.component.css',
  host: { class: 'flex w-full' },
})
export class CookiePreferenceDialogFooterComponent {
  //#region Propriétés
  /**
   * Propriété dialogRef
   * @readonly
   *
   * @description
   * Référence du dialogue
   *
   * @access public
   * @memberof CookiePreferenceDialogFooterComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogRef<CookiePreferenceDialogComponent>} dialogRef
   */
  public readonly dialogRef: DynamicDialogRef<CookiePreferenceDialogComponent> =
    inject<DynamicDialogRef<CookiePreferenceDialogComponent>>(DynamicDialogRef);

  /**
   * Propriété dialogConfig
   * @readonly
   *
   * @description
   * Configuration du dialogue
   *
   * @access public
   * @memberof CookiePreferenceDialogFooterComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogConfig<CookiePreferenceDialogData>} dialogConfig
   */
  public readonly dialogConfig: DynamicDialogConfig<CookiePreferenceDialogData> =
    inject<DynamicDialogConfig<CookiePreferenceDialogData>>(DynamicDialogConfig);
  //#endregion

  //#region Méthodes
  //#endregion
}
