import { Component, inject, input, InputSignal, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { UserEmailVerification } from '@app/core/models/user/user-email-verification.model';
import { Store } from '@ngrx/store';
import { AuthState } from '@app/core/stores/auth/auth.state';
import { selectAuthLoading } from '@app/core/stores/auth/auth.selectors';
import { verifyEmail } from '@app/core/stores/auth/auth.actions';
import { ActivatedRoute } from '@angular/router';

/**
 * Type AuthEmailVerificationFormValues
 * @type AuthEmailVerificationFormValues
 *
 * @description
 * Type représentant les valeurs du
 * formulaire de vérification de Email
 *
 * @version 1.0.0
 *
 * @property {string} code - Code de vérification
 *
 * @example
 * ```typescript
 * const authEmailVerificationFormValues: AuthEmailVerificationFormValues = {
 *   code: "123456"
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
type AuthEmailVerificationFormValues = Omit<UserEmailVerification, 'email'>;

/**
 * Type AuthEmailVerificationFormControls
 * @type AuthEmailVerificationFormControls
 *
 * @description
 * Type représentant les contrôles du
 * formulaire de vérification de Email
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
type AuthEmailVerificationFormControls = {
  [K in keyof AuthEmailVerificationFormValues]: FormControl<AuthEmailVerificationFormValues[K]>;
};

@Component({
  selector: 'app-auth-email-verification-form',
  imports: [
    ReactiveFormsModule,
    InputOtpModule,
    CheckboxModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './auth-email-verification-form.component.html',
  styleUrl: './auth-email-verification-form.component.css'
})
export class AuthEmailVerificationFormComponent {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   *
   * @description
   * Service de création de formulaire
   *
   * @access private
   * @memberof AuthEmailVerificationFormComponent
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
   * @memberof AuthEmailVerificationFormComponent
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
   * @memberof AuthEmailVerificationFormComponent
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
   * @memberof AuthEmailVerificationFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup<AuthEmailVerificationFormControls>} form
   */
  public readonly form: FormGroup<AuthEmailVerificationFormControls> = this.formBuilder.group({
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
   * @memberof AuthEmailVerificationFormComponent
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
   * le formulaire de vérification de Email.
   *
   * @access public
   * @memberof AuthEmailVerificationFormComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onSubmit(): void {
    if (this.form.invalid) return;

    const email: string = this.email();

    this.store.dispatch(verifyEmail({
      verification: {
        email: email,
        code: this.form.value.code!
      }
    }))
  }
  //#endregion
}
