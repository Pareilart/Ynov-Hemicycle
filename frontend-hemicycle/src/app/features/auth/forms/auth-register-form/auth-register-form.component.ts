import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserGender } from '@app/core/models/user/user-gender.enum';
import { Email } from '@core/models/email/email.model';
import { UserRegistration } from '@core/models/user/user-registration.model';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { StepperModule } from 'primeng/stepper';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Store } from '@ngrx/store';
import { AuthState } from '@app/core/stores/auth/auth.state';
import { selectAuthLoading } from '@app/core/stores/auth/auth.selectors';
import { register } from '@app/core/stores/auth/auth.actions';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from "../../../../shared/components/form-errors/form-errors.component";
import { FormErrorsItemComponent } from "../../../../shared/components/form-errors/form-errors-item/form-errors-item.component";

/**
 * Type AuthRegisterFormValues
 * @type AuthRegisterFormValues
 *
 * @description
 * Type représentant les valeurs du
 * formulaire d'inscription
 *
 * @version 1.0.0
 *
 * @property {string} email - Email de l'utilisateur
 * @property {string} password - Mot de passe de l'utilisateur
 * @property {string} passwordConfirmation - Confirmation du mot de passe de l'utilisateur
 * @property {boolean} terms - Acceptation des termes et conditions
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see UserRegistration
 */
type AuthRegisterFormValues = {
  infos: Pick<UserRegistration, 'firstname' | 'lastname' | 'gender' | 'birthday'>;
  credentials: Pick<UserRegistration, 'email' | 'password'> & {
    passwordConfirmation: string;
    terms: boolean;
  };
}

/**
 * Type AuthRegisterFormControls
 * @type AuthRegisterFormControls
 *
 * @description
 * Type représentant les contrôles du
 * formulaire d'inscription
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see UserRegistration
 */
type AuthRegisterFormControls ={
  infos: FormGroup<{
    [K in keyof Required<AuthRegisterFormValues['infos']>]: FormControl<Required<AuthRegisterFormValues['infos']>[K]>
  }>;
  credentials: FormGroup<{
    [K in keyof Required<AuthRegisterFormValues['credentials']>]: K extends 'email'
      ? FormControl<Email | string>
      : FormControl<Required<AuthRegisterFormValues['credentials']>[K]>;
  }>;
}

/**
 * Type GenderOption
 * @type GenderOption
 *
 * @description
 * Type représentant une option de genre
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see UserGender
 */
type GenderOption = {
  label: string;
  value: UserGender;
};

@Component({
  selector: 'app-auth-register-form',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    StepperModule,
    SelectModule,
    DatePickerModule,
    CommonModule,
    FormErrorsComponent,
    FormErrorsItemComponent
],
  templateUrl: './auth-register-form.component.html',
  styleUrl: './auth-register-form.component.css',
})
export class AuthRegisterFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   *
   * @description
   * Service de création de formulaire
   *
   * @access private
   * @memberof AuthRegisterFormComponent
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
   * Service de stockage
   *
   * @access private
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   *
   * @type {Store<AuthState>} store
   */
  private readonly store: Store<AuthState> =
    inject<Store<AuthState>>(Store<AuthState>);

  /**
   * Propriété loading
   * @readonly
   *
   * @description
   * Indicateur de chargement
   *
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   *
   * @type {Signal<boolean>} loading
   */
  public readonly loading: Signal<boolean> =
    this.store.selectSignal(selectAuthLoading);

  /**
   * Propriété genderOptions
   * @readonly
   *
   * @description
   * Options de genre
   *
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   *
   * @type {Signal<GenderOption[]>} genderOptions
   */
  public readonly genderOptions: Signal<GenderOption[]> = signal<GenderOption[]>([
    {
      label: 'Masculin',
      value: UserGender.MALE
    },
    {
      label: 'Féminin',
      value: UserGender.FEMALE
    },
    {
      label: 'Autre',
      value: UserGender.OTHER
    }
  ]);

  /**
   * Propriété birthdayMinDate
   * @readonly
   *
   * @description
   * Date minimum de naissance
   *
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   *
   * @type {Date} birthdayMinDate
   */
  public readonly birthdayMinDate: Date = new Date(new Date().getFullYear() - 100, 0, 1);

  /**
   * Propriété birthdayMaxDate
   * @readonly
   *
   * @description
   * Date maximum de naissance
   *
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   *
   * @type {Date} birthdayMaxDate
   */
  public readonly birthdayMaxDate: Date = new Date(new Date().getFullYear() - 18, 0, 1);

  /**
   * Propriété form
   * @readonly
   *
   * @description
   * Formulaire de connexion
   *
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup<AuthRegisterFormControls>} form
   */
  public readonly form: FormGroup<AuthRegisterFormControls> = this.formBuilder.group({
    infos: this.formBuilder.group({
      firstname: this.formBuilder.control<string>({
        value: '',
        disabled: false
      }, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastname: this.formBuilder.control<string>({
        value: '',
        disabled: false
      }, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      gender: this.formBuilder.control<UserGender>({
        value: UserGender.MALE,
        disabled: false
      }, [Validators.required]),
      birthday: this.formBuilder.control<Date>({
        value: new Date(),
        disabled: false
      }, [Validators.required]),
    }),
    credentials: this.formBuilder.group({
      email: this.formBuilder.control<Email | string>({
        value: '',
        disabled: false
      }, [Validators.required, Validators.email]),
      password: this.formBuilder.control<string>({
        value: '',
        disabled: false
      }, [Validators.required]),
      passwordConfirmation: this.formBuilder.control<string>({
        value: '',
        disabled: false
      }, [Validators.required]),
      terms: this.formBuilder.control<boolean>({
        value: false,
        disabled: false
      }, [Validators.requiredTrue])
    })
  });

  /**
   * Propriété infosForm
   * @readonly
   *
   * @description
   * Formulaire d'informations
   *
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup} infosForm
   */
  public readonly infosForm: FormGroup = this.form.get('infos') as FormGroup;

  /**
   * Propriété credentialsForm
   * @readonly
   *
   * @description
   * Formulaire d'identifiants
   *
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup} credentialsForm
   */
  public readonly credentialsForm: FormGroup = this.form.get('credentials') as FormGroup;
  //#endregion

  //#region Méthodes
  /**
   * Méthode onSubmit
   * @method onSubmit
   *
   * @description
   * Méthode onSubmit pour soumettre
   * le formulaire d'inscription.
   *
   * @access public
   * @memberof AuthRegisterFormComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onSubmit(): void {
    if (this.form.invalid) return;

    const infos = this.form.value.infos!;
    const credentials = this.form.value.credentials!;

    this.store.dispatch(register({
      registration: {
        firstname: infos.firstname!,
        lastname: infos.lastname!,
        email: credentials.email!,
        password: credentials.password!,
        gender: infos.gender!,
        birthday: infos.birthday!
      }
    }))
  }
  //#endregion
}
