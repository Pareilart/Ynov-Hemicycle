import { Component, inject, input, InputSignal, OnInit, Signal } from '@angular/core';
import { User, UserUpdatePayload } from '@app/core/models/user/user.model';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountState } from '@app/core/stores/account/account.state';
import { Store } from '@ngrx/store';
import { FormErrorsItemComponent } from '@app/shared/components/form-errors/form-errors-item/form-errors-item.component';
import { FormErrorsComponent } from '@app/shared/components/form-errors/form-errors.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { selectAccountLoading } from '@app/core/stores/account/account.selectors';
import { updateAccount } from '@core/stores/account/account.actions';
import { FormInputLabelComponent } from "@shared/components/form-input-label/form-input-label.component";
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

/**
 * Type AccountUserUpdateFormValues
 * @type AccountUserUpdateFormValues
 *
 * @description
 * Type représentant les valeurs du
 * formulaire de mise à jour de l'utilisateur
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see UserUpdatePayload
 */
type AccountUserUpdateFormValues = UserUpdatePayload;

/**
 * Type AccountUserUpdateFormControls
 * @type AccountUserUpdateFormControls
 *
 * @description
 * Type représentant les contrôles du
 * formulaire de mise à jour de l'utilisateur
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see UserUpdatePayload
 */
type AccountUserUpdateFormControls = {
  [K in keyof AccountUserUpdateFormValues]-?: FormControl<NonNullable<AccountUserUpdateFormValues[K]>>;
};

@Component({
  selector: 'app-account-user-update-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RouterModule,
    FormErrorsComponent,
    FormErrorsItemComponent,
    FormInputLabelComponent,
    DatePickerModule,
    ToggleSwitchModule
  ],
  templateUrl: './account-user-update-form.component.html',
  styleUrl: './account-user-update-form.component.css'
})
export class AccountUserUpdateFormComponent implements OnInit {
  //#region Propriétés
  /**
   * Propriété account
   * @readonly
   *
   * @description
   * Utilisateur connecté
   *
   * @access public
   * @memberof AccountUserUpdateFormComponent
   * @since 1.0.0
   *
   * @type {InputSignal<User>} account
   */
  public readonly account: InputSignal<User> =
    input.required<User>();

  /**
   * Propriété formBuilder
   * @readonly
   *
   * @description
   * Service de création de formulaire
   *
   * @access private
   * @memberof AccountUserUpdateFormComponent
   * @since 1.0.0
   *
   * @type {NonNullableFormBuilder} formBuilder
   */
  private readonly formBuilder: NonNullableFormBuilder =
    inject<NonNullableFormBuilder>(NonNullableFormBuilder);

  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Store de l'authentification
   *
   * @access private
   * @memberof AccountUserUpdateFormComponent
   * @since 1.0.0
   *
   * @type {Store<AccountState>} store
   */
  private readonly store: Store<AccountState> =
    inject<Store<AccountState>>(Store<AccountState>);

  /**
   * Propriété loading
   * @readonly
   *
   * @description
   * Statut de chargement
   *
   * @access public
   * @memberof AccountUserUpdateFormComponent
   * @since 1.0.0
   *
   * @type {Signal<boolean>} loading
   */
  public readonly loading: Signal<boolean> =
    this.store.selectSignal<boolean>(selectAccountLoading);

  /**
   * Propriété form
   * @readonly
   *
   * @description
   * Formulaire de mise à jour de l'utilisateur
   *
   * @access public
   * @memberof AccountUserUpdateFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup<AccountUserUpdateFormControls>} form
   */
  public readonly form: FormGroup<AccountUserUpdateFormControls> = this.formBuilder.group({
    firstname: this.formBuilder.control<string>({
      value: '',
      disabled: false
    }, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    lastname: this.formBuilder.control<string>({
      value: '',
      disabled: false
    }, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    birthday: this.formBuilder.control<Date>({
      value: new Date(),
      disabled: false
    }, [Validators.required]),
    twoFactorEnabled: this.formBuilder.control<boolean>({
      value: false,
      disabled: false
    }, [
      Validators.required,
    ]),
  });
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   * @method ngOnInit
   *
   * @description
   * Méthode ngOnInit pour initialiser le composant
   *
   * @access public
   * @memberof AccountUserUpdateFormComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public ngOnInit(): void {
    this.patchForm();
  }

  /**
   * Méthode patchForm
   * @method patchForm
   *
   * @description
   * Méthode patchForm pour patcher le formulaire
   *
   * @access public
   * @memberof AccountUserUpdateFormComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public patchForm(): void {
    const account: User = this.account();

    this.form.patchValue({
      firstname: account.firstname,
      lastname: account.lastname,
      birthday: account.birthday,
      twoFactorEnabled: account.twoFactorEnabled
    });
  }

  /**
   * Méthode onSubmit
   * @method onSubmit
   *
   * @description
   * Méthode onSubmit pour soumettre le formulaire
   *
   * @access public
   * @memberof AccountUserUpdateFormComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onSubmit(): void {
    if (this.form.invalid) return;

    this.store.dispatch(updateAccount({
      payload: this.form.value
    }));
  }
  //#endregion
}
