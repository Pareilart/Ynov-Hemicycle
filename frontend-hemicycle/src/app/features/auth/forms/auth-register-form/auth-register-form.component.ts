import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Email } from '@core/models/email/email.model';
import { UserRegistration } from '@core/models/user/user-registration.model';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

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
type AuthRegisterFormValues = UserRegistration & {
  passwordConfirmation: string;
  terms: boolean;
};

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
type AuthRegisterFormControls = {
  [K in keyof Required<AuthRegisterFormValues>]: K extends 'email'
    ? FormControl<Email | string>
    : FormControl<Required<AuthRegisterFormValues>[K]>;
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
    ButtonModule
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
    firstName: this.formBuilder.control<string>({
      value: '',
      disabled: false
    }),
    lastName: this.formBuilder.control<string>({
      value: '',
      disabled: false
    }),
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
  });
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
