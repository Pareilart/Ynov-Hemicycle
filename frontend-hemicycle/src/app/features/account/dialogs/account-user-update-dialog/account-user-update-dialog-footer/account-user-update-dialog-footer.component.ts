import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountUserUpdateDialogComponent, AccountUserUpdateDialogData } from '../account-user-update-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-user-update-dialog-footer',
  imports: [
    RouterModule
  ],
  templateUrl: './account-user-update-dialog-footer.component.html',
  styleUrl: './account-user-update-dialog-footer.component.css',
  host: { class: 'w-full' }
})
export class AccountUserUpdateDialogFooterComponent {
  //#region Propriétés
  /**
   * Propriété dialogRef
   * @readonly
   *
   * @description
   * Référence du dialogue
   *
   * @access public
   * @memberof AccountUserUpdateDialogFooterComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogRef<AccountUserUpdateDialogComponent>} dialogRef
   */
  public readonly dialogRef: DynamicDialogRef<AccountUserUpdateDialogComponent> =
    inject<DynamicDialogRef<AccountUserUpdateDialogComponent>>(DynamicDialogRef);

  /**
   * Propriété dialogConfig
   * @readonly
   *
   * @description
   * Configuration du dialogue
   *
   * @access public
   * @memberof AccountUserUpdateDialogFooterComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogConfig<AccountUserUpdateDialogData>} dialogConfig
   */
  public readonly dialogConfig: DynamicDialogConfig<AccountUserUpdateDialogData> =
    inject<DynamicDialogConfig<AccountUserUpdateDialogData>>(DynamicDialogConfig);
  //#endregion
}
