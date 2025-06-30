import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-auth-otp-verification-form',
  imports: [
    ReactiveFormsModule,
    InputOtpModule,
    CheckboxModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './auth-otp-verification-form.component.html',
  styleUrl: './auth-otp-verification-form.component.css'
})
export class AuthOtpVerificationFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   *
   * @description
   * Service de création de formulaire
   *
   * @access private
   * @memberof AuthLoginFormComponent
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
   * @memberof AuthLoginFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup<AuthLoginFormControls>} form
   */
  public readonly form: FormGroup = this.formBuilder.group({
    code: this.formBuilder.control<string>({
      value: '',
      disabled: false
    }, [Validators.required]),
  });
  //#endregion

  //#region Méthodes
  /**
   * Méthode onSubmit
   * @method onSubmit
   *
   * @description
   * Méthode onSubmit pour soumettre
   * le formulaire de connexion.
   *
   * @access public
   * @memberof AuthLoginFormComponent
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
