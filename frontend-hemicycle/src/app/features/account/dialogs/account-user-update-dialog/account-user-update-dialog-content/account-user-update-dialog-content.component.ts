import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountUserUpdateDialogComponent, AccountUserUpdateDialogData } from '../account-user-update-dialog.component';
import { AccountUserUpdateFormComponent } from "@features/account/forms/account-user-update-form/account-user-update-form.component";

@Component({
  selector: 'app-account-user-update-dialog-content',
  imports: [AccountUserUpdateFormComponent],
  templateUrl: './account-user-update-dialog-content.component.html',
  styleUrl: './account-user-update-dialog-content.component.css',
  host: { class: 'w-full' }
})
export class AccountUserUpdateDialogContentComponent {
  //#region Propriétés
  /**
   * Propriété dialogRef
   * @readonly
   *
   * @description
   * Référence du dialogue
   *
   * @access public
   * @memberof AccountUserUpdateDialogContentComponent
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
   * @memberof AccountUserUpdateDialogContentComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogConfig<AccountUserUpdateDialogData>} dialogConfig
   */
  public readonly dialogConfig: DynamicDialogConfig<AccountUserUpdateDialogData> =
    inject<DynamicDialogConfig<AccountUserUpdateDialogData>>(DynamicDialogConfig<AccountUserUpdateDialogData>);
  //#endregion
}
