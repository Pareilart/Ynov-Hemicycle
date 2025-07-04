import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountUserUpdateDialogComponent, AccountUserUpdateDialogData } from '../account-user-update-dialog.component';

@Component({
  selector: 'app-account-user-update-dialog-header',
  imports: [ButtonModule],
  templateUrl: './account-user-update-dialog-header.component.html',
  styleUrl: './account-user-update-dialog-header.component.css',
  host: { class: 'w-full' }
})
export class AccountUserUpdateDialogHeaderComponent {
  //#region Propriétés
  /**
   * Propriété dialogRef
   * @readonly
   *
   * @description
   * Référence du dialogue
   *
   * @access public
   * @memberof AccountUserUpdateDialogHeaderComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogRef<AccountUserUpdateDialogComponent>} dialogRef
   */
  public readonly dialogRef: DynamicDialogRef<AccountUserUpdateDialogComponent> =
    inject<DynamicDialogRef<AccountUserUpdateDialogComponent>>(DynamicDialogRef<AccountUserUpdateDialogComponent>);

  /**
   * Propriété dialogConfig
   * @readonly
   *
   * @description
   * Configuration du dialogue
   *
   * @access public
   * @memberof AccountUserUpdateDialogHeaderComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogConfig<AccountUserUpdateDialogData>} dialogConfig
   */
  public readonly dialogConfig: DynamicDialogConfig<AccountUserUpdateDialogData> =
    inject<DynamicDialogConfig<AccountUserUpdateDialogData>>(DynamicDialogConfig<AccountUserUpdateDialogData>);
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
   * @memberof AccountUserUpdateDialogHeaderComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onClose(): void {
    this.dialogRef.close();
  }
  //#endregion
}
