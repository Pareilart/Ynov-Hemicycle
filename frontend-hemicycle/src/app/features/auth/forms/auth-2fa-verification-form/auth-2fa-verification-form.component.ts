import { Component, inject, input, InputSignal, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { User2FA } from '@app/core/models/user/user-2fa.model';
import { Store } from '@ngrx/store';
import { AuthState } from '@app/core/stores/auth/auth.state';
import { selectAuthLoading } from '@app/core/stores/auth/auth.selectors';
import { verify2FA } from '@app/core/stores/auth/auth.actions';
import { ActivatedRoute } from '@angular/router';

/**
 * Type Auth2FAVerificationFormValues
 * @type Auth2FAVerificationFormValues
 *
 * @description
 * Type représentant les valeurs du
 * formulaire de vérification de 2FA
 *
 * @version 1.0.0
 *
 * @property {string} code - Code de vérification
 *
 * @example
 * ```typescript
 * const auth2FAVerificationFormValues: Auth2FAVerificationFormValues = {
 *   code: "123456"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
type Auth2FAVerificationFormValues = Omit<User2FA, 'email'>;

/**
 * Type Auth2FAVerificationFormControls
 * @type Auth2FAVerificationFormControls
 *
 * @description
 * Type représentant les contrôles du
 * formulaire de vérification de 2FA
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
type Auth2FAVerificationFormControls = {
  [K in keyof Auth2FAVerificationFormValues]: FormControl<Auth2FAVerificationFormValues[K]>;
};

@Component({
  selector: 'app-auth-2fa-verification-form',
  imports: [
    ReactiveFormsModule,
    InputOtpModule,
    CheckboxModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './auth-2fa-verification-form.component.html',
  styleUrl: './auth-2fa-verification-form.component.css'
})
export class Auth2FAVerificationFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   *
   * @description
   * Service de création de formulaire
   *
   * @access private
   * @memberof Auth2FAVerificationFormComponent
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
   * @memberof Auth2FAVerificationFormComponent
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
   * Signal de chargement
   *
   * @access public
   * @memberof Auth2FAVerificationFormComponent
   * @since 1.0.0
   *
   * @type {Signal<boolean>} loading
   */
  public readonly loading: Signal<boolean> =
    this.store.selectSignal(selectAuthLoading);

  /**
   * Propriété form
   * @readonly
   *
   * @description
   * Formulaire de connexion
   *
   * @access public
   * @memberof Auth2FAVerificationFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup<Auth2FAVerificationFormControls>} form
   */
  public readonly form: FormGroup<Auth2FAVerificationFormControls> = this.formBuilder.group({
    code: this.formBuilder.control<string>({
      value: '',
      disabled: false
    }, [Validators.required]),
  });

  /**
   * Propriété email
   * @readonly
   *
   * @description
   * Signal de l'email
   *
   * @access public
   * @memberof Auth2FAVerificationFormComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string>} email
   */
  public readonly email: InputSignal<string> =
    input.required<string>();
  //#endregion

  //#region Méthodes
  /**
   * Méthode onSubmit
   * @method onSubmit
   *
   * @description
   * Méthode onSubmit pour soumettre
   * le formulaire de vérification de 2FA.
   *
   * @access public
   * @memberof Auth2FAVerificationFormComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onSubmit(): void {
    if (this.form.invalid) return;

    const email: string = this.email();

    this.store.dispatch(verify2FA({
      twoFA: {
        email: email,
        code: this.form.value.code!
      }
    }))
  }
  //#endregion
}
