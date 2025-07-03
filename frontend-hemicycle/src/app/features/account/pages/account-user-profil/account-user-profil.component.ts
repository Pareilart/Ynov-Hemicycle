import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { User} from '@core/models/user/user.model'
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { AccountState } from '@core/stores/account/account.state';
import { selectAccountCurrentUser } from '@core/stores/account/account.selectors';
import { AccountUserUpdateFormComponent } from '../../forms/account-user-update-form/account-user-update-form.component';

@Component({
  selector: 'app-account-user-profil',
  imports: [
    MessageModule,
    CommonModule,
    CheckboxModule,
    FormsModule,
    AccountUserUpdateFormComponent
  ],
  templateUrl: './account-user-profil.component.html',
  styleUrl: './account-user-profil.component.css'
})
export class AccountUserProfilComponent {
  //#region Propriétés

  twoFactorEnabled: boolean = false;

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
  //#endregion
}
