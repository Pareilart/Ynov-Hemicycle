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
  infos: Pick<UserRegistration, 'firstName' | 'lastName' | 'gender' | 'city' | 'postalCode'>;
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
    SelectModule
  ],
  templateUrl: './auth-register-form.component.html',
  styleUrl: './auth-register-form.component.css'
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
      firstName: this.formBuilder.control<string>({
        value: '',
        disabled: false
      }),
      lastName: this.formBuilder.control<string>({
        value: '',
        disabled: false
      }),
      gender: this.formBuilder.control<UserGender>({
        value: UserGender.MALE,
        disabled: false
      }, [Validators.required]),
      city: this.formBuilder.control<string>({
        value: '',
        disabled: false
      }, [Validators.required]),
      postalCode: this.formBuilder.control<string>({
        value: '',
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

  public readonly infosForm: FormGroup = this.form.get('infos') as FormGroup;
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

    console.log(this.form.value);
  }
  //#endregion
}
