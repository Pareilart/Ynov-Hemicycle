import { Component, inject } from '@angular/core';
import { CookiePreferenceDialogComponent, type CookiePreferenceDialogData } from '../cookie-preference-dialog.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cookie-preference-dialog-header',
  imports: [ButtonModule],
  templateUrl: './cookie-preference-dialog-header.component.html',
  styleUrl: './cookie-preference-dialog-header.component.css',
  host: {
    class: 'w-full'
  }
})
export class CookiePreferenceDialogHeaderComponent {
  //#region Propriétés
  /**
   * Propriété dialogRef
   * @readonly
   *
   * @description
   * Référence du dialogue
   *
   * @access public
   * @memberof CookiePreferenceDialogHeaderComponent
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
   * @memberof CookiePreferenceDialogHeaderComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogConfig<CookiePreferenceDialogData>} dialogConfig
   */
  public readonly dialogConfig: DynamicDialogConfig<CookiePreferenceDialogData> =
    inject<DynamicDialogConfig<CookiePreferenceDialogData>>(DynamicDialogConfig);
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
   * @memberof CookiePreferenceDialogHeaderComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onClose(): void {
    this.dialogRef.close();
  }
  //#endregion
}
