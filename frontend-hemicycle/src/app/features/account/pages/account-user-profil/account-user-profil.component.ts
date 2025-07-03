import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { User} from '@core/models/user/user.model'
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { AccountState } from '@core/stores/account/account.state';
import { selectAccountCurrentUser } from '@core/stores/account/account.selectors';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountUserUpdateDialogComponent, AccountUserUpdateDialogData } from '@features/account/dialogs/account-user-update-dialog/account-user-update-dialog.component';
import { AccountUserUpdateDialogHeaderComponent } from '@features/account/dialogs/account-user-update-dialog/account-user-update-dialog-header/account-user-update-dialog-header.component';
import { AccountUserUpdateDialogContentComponent } from '@features/account/dialogs/account-user-update-dialog/account-user-update-dialog-content/account-user-update-dialog-content.component';
import { AccountUserUpdateDialogFooterComponent } from '@features/account/dialogs/account-user-update-dialog/account-user-update-dialog-footer/account-user-update-dialog-footer.component';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-account-user-profil',
  imports: [
    MessageModule,
    CommonModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    ConfirmDialogModule
  ],
  templateUrl: './account-user-profil.component.html',
  styleUrl: './account-user-profil.component.css',
  providers: [ConfirmationService]
})
export class AccountUserProfilComponent {
  //#region Propriétés

  twoFactorEnabled: boolean = false;

  /**
   * Propriété dialogService
   * @readonly
   *
   * @description
   * Service de dialogue
   *
   * @access private
   * @memberof AccountUserProfilComponent
   * @since 1.0.0
   *
   * @type {DialogService} dialogService
   */
  private readonly dialogService: DialogService =
    inject<DialogService>(DialogService);

  /**
   * Propriété confirmationService
   * @readonly
   *
   * @description
   * Service de confirmation
   *
   * @access private
   * @memberof AccountUserProfilComponent
   * @since 1.0.0
   *
   * @type {ConfirmationService} confirmationService
   */
  private readonly confirmationService: ConfirmationService =
    inject<ConfirmationService>(ConfirmationService);

  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Store de l'authentification
   *
   * @access private
   * @memberof AccountUserProfilComponent
   * @since 1.0.0
   *
   * @type {Store<AccountState>} store
   */
  private readonly store: Store<AccountState> =
    inject<Store<AccountState>>(Store<AccountState>);

  /**
   * Propriété user
   * @readonly
   *
   * @description
   * Utilisateur connecté
   *
   * @access public
   * @memberof AccountUserProfilComponent
   * @since 1.0.0
   *
   * @type {Signal<User | null>} user
   */
  public readonly user: Signal<User | null> =
    this.store.selectSignal<User | null>(selectAccountCurrentUser);

  /**
   * Propriété updateDialogRef
   *
   * @description
   * Référence du dialogue de mise à jour
   *
   * @access private
   * @memberof AccountUserProfilComponent
   * @since 1.0.0
   *
   * @type {DynamicDialogRef<AccountUserUpdateDialogComponent> | null} updateDialogRef
   */
  private updateDialogRef: DynamicDialogRef<AccountUserUpdateDialogComponent> | null = null;
  //#endregion

  //#region Méthodes
  public openConfirmDeleteDialog(event: Event): void {
    const account: User | null = this.user();
    if (account === null) return;

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez-vous vraiment supprimer votre compte ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'Annuler',
        icon: 'pi pi-times',
        class: 'p-button-text'
      },
      acceptButtonProps: {
        label: 'Supprimer',
        icon: 'pi pi-check',
        class: 'p-button-danger'
      },
      reject: () => {
        console.log('Annuler');
      },
      accept: () => {
        console.log('Supprimer');
      }
    });
  }

  /**
   * Méthode openUpdateDialog
   * @method openUpdateDialog
   *
   * @description
   * Ouvre le dialogue de mise à jour
   *
   * @access public
   * @memberof AccountUserProfilComponent
   * @since 1.0.0
   *
   * @returns {DynamicDialogRef<AccountUserUpdateDialogComponent>} - Référence du dialogue de mise à jour
   */
  public openUpdateDialog(): DynamicDialogRef<AccountUserUpdateDialogComponent> | null {
    const account: User | null = this.user();
    if (account === null) return null;

    /**
     * Données du dialogue
     * @const data
     *
     * @description
     * Données du dialogue de mise à jour
     *
     * @type {AccountUserUpdateDialogData} data
     */
    const data: AccountUserUpdateDialogData = {
      account: account
    };

    /**
     * Configuration du dialogue
     * @const config
     *
     * @description
     * Configuration du dialogue de mise à jour
     *
     * @type {DynamicDialogConfig<AccountUserUpdateDialogData>} config
     */
    const config: DynamicDialogConfig<AccountUserUpdateDialogData> = {
      styleClass: 'w-[500px] max-w-full',
      position: 'center',
      closeOnEscape: true,
      modal: true,
      closable: true,
      dismissableMask: true,
      data: data,
      templates: {
        header: AccountUserUpdateDialogHeaderComponent,
        content: AccountUserUpdateDialogContentComponent,
        footer: AccountUserUpdateDialogFooterComponent
      }
    }

    // Ouvre le dialogue de mise à jour
    this.updateDialogRef = this.dialogService.open<
      AccountUserUpdateDialogComponent,
      AccountUserUpdateDialogData
    >(AccountUserUpdateDialogComponent, config);

    return this.updateDialogRef;
  }
  //#endregion
}
