import { Component, inject } from '@angular/core';
import { CookiePreferenceDialogComponent, type CookiePreferenceDialogData } from '../cookie-preference-dialog.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CookiePreferenceFormComponent } from '@app/shared/forms/cookie-preference-form/cookie-preference-form.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cookie-preference-dialog-content',
  imports: [
    CookiePreferenceFormComponent,
    ButtonModule
  ],
  templateUrl: './cookie-preference-dialog-content.component.html',
  styleUrl: './cookie-preference-dialog-content.component.css'
})
export class CookiePreferenceDialogContentComponent {
  //#region Propriétés
  /**
   * Propriété dialogRef
   * @readonly
   *
   * @description
   * Référence du dialogue
   *
   * @access public
   * @memberof CookiePreferenceDialogContentComponent
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
   * @memberof CookiePreferenceDialogContentComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogConfig<CookiePreferenceDialogData>} dialogConfig
   */
  public readonly dialogConfig: DynamicDialogConfig<CookiePreferenceDialogData> =
    inject<DynamicDialogConfig<CookiePreferenceDialogData>>(DynamicDialogConfig);
  //#endregion

  //#region Méthodes
  /**
   * Méthode onPreferenceSubmitted
   * @method onPreferenceSubmitted
   *
   * @description
   * Méthode onPreferenceSubmitted pour soumettre
   * les préférences de cookies.
   *
   * @access public
   * @memberof CookiePreferenceDialogContentComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onPreferenceSubmitted(): void {
    this.dialogRef.close();
  }
  //#endregion
}
