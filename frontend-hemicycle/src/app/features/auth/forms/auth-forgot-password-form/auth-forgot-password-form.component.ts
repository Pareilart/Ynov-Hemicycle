import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Email } from '@core/models/email/email.model';
import { UserForgotPassword } from '@core/models/user/user-forgot-password.model';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

/**
 * Type AuthForgotPasswordFormValues
 * @type AuthForgotPasswordFormValues
 *
 * @description
 * Type représentant les valeurs du
 * formulaire de mot de passe oublié
 *
 * @version 1.0.0
 *
 * @property {Email} email - Email de l'utilisateur
 *
 * @example
 * ```typescript
 * const authForgotPasswordFormValues: AuthForgotPasswordFormValues = {
 *   email: "contact@valentin-fortin.pro"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
type AuthForgotPasswordFormValues = UserForgotPassword;

/**
 * Type AuthForgotPasswordFormControls
 * @type AuthForgotPasswordFormControls
 *
 * @description
 * Type représentant les contrôles du
 * formulaire de mot de passe oublié
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
type AuthForgotPasswordFormControls = {
  [K in keyof AuthForgotPasswordFormValues]: K extends 'email'
    ? FormControl<Email | string>
    : FormControl<AuthForgotPasswordFormValues[K]>;
};

@Component({
  selector: 'app-auth-forgot-password-form',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './auth-forgot-password-form.component.html',
  styleUrl: './auth-forgot-password-form.component.css'
})
export class AuthForgotPasswordFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   *
   * @description
   * Service de création de formulaire
   *
   * @access private
   * @memberof AuthForgotPasswordFormComponent
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
   * @memberof AuthForgotPasswordFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup<AuthForgotPasswordFormControls>} form
   */
  public readonly form: FormGroup<AuthForgotPasswordFormControls> = this.formBuilder.group({
    email: this.formBuilder.control<Email | string>({
      value: '',
      disabled: false
    }, [Validators.required, Validators.email])
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
   * @memberof AuthForgotPasswordFormComponent
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
