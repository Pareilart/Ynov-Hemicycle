import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserResetPassword } from '@core/models/user/user-reset-password.model';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

/**
 * Type AuthResetPasswordFormValues
 * @type AuthResetPasswordFormValues
 *
 * @description
 * Type représentant les valeurs du
 * formulaire de réinitialisation de mot de passe
 *
 * @version 1.0.0
 *
 * @property {string} password - Mot de passe de l'utilisateur
 * @property {string} confirmPassword - Confirmation du mot de passe de l'utilisateur
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see UserResetPassword
 */
type AuthResetPasswordFormValues = UserResetPassword;

/**
 * Type AuthResetPasswordFormControls
 * @type AuthResetPasswordFormControls
 *
 * @description
 * Type représentant les contrôles du
 * formulaire de réinitialisation de mot de passe
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see UserResetPassword
 */
type AuthResetPasswordFormControls = {
  [K in keyof AuthResetPasswordFormValues]: FormControl<AuthResetPasswordFormValues[K]>;
}

@Component({
  selector: 'app-auth-reset-password-form',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './auth-reset-password-form.component.html',
  styleUrl: './auth-reset-password-form.component.css'
})
export class AuthResetPasswordFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   *
   * @description
   * Service de création de formulaire
   *
   * @access private
   * @memberof AuthResetPasswordFormComponent
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
   * Formulaire de réinitialisation de mot de passe
   *
   * @access public
   * @memberof AuthResetPasswordFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup<AuthResetPasswordFormControls>} form
   */
  public readonly form: FormGroup<AuthResetPasswordFormControls> = this.formBuilder.group({
    password: this.formBuilder.control<string>({
      value: '',
      disabled: false
    }, [Validators.required]),
    passwordConfirmation: this.formBuilder.control<string>({
      value: '',
      disabled: false
    }, [Validators.required])
  });
  //#endregion

  //#region Méthodes
  /**
   * Méthode onSubmit
   * @method onSubmit
   *
   * @description
   * Méthode onSubmit pour soumettre
   * le formulaire de réinitialisation de mot de passe.
   *
   * @access public
   * @memberof AuthResetPasswordFormComponent
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
