import { Component, inject, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredentials } from '@core/models/user/user-credentials.model';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { Email } from '@core/models/email/email.model';
import { AuthState } from '@app/core/stores/auth/auth.state';
import { Store } from '@ngrx/store';
import { selectAuthLoading } from '@app/core/stores/auth/auth.selectors';
import { login } from '@app/core/stores/auth/auth.actions';

/**
 * Type AuthLoginFormValues
 * @type AuthLoginFormValues
 *
 * @description
 * Type représentant les valeurs du
 * formulaire de connexion
 *
 * @version 1.0.0
 *
 * @property {string} email - Email de l'utilisateur
 * @property {string} password - Mot de passe de l'utilisateur
 * @property {boolean} rememberMe - souvenir de moi
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see UserCredentials
 */
type AuthLoginFormValues = UserCredentials & {
  rememberMe: boolean;
};

/**
 * Type AuthLoginFormControls
 * @type AuthLoginFormControls
 *
 * @description
 * Type représentant les contrôles du
 * formulaire de connexion
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see UserCredentials
 */
type AuthLoginFormControls = {
  [K in keyof AuthLoginFormValues]: K extends 'email'
    ? FormControl<Email | string>
    : FormControl<AuthLoginFormValues[K]>;
};

type AuthProvider = {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-auth-login-form',
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.css',
  host: { class: 'w-full' }
})
export class AuthLoginFormComponent {
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
   * Propriété store
   * @readonly
   *
   * @description
   * Store de l'authentification
   *
   * @access private
   * @memberof AuthLoginFormComponent
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
   * @memberof AuthLoginFormComponent
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
   * @memberof AuthLoginFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup<AuthLoginFormControls>} form
   */
  public readonly form: FormGroup<AuthLoginFormControls> = this.formBuilder.group({
    email: this.formBuilder.control<Email | string>({
      value: '',
      disabled: false
    }, [Validators.required, Validators.email]),
    password: this.formBuilder.control<string>({
      value: '',
      disabled: false
    }, [Validators.required]),
    rememberMe: this.formBuilder.control<boolean>({
      value: false,
      disabled: false
    })
  });

  /**
   * Propriété providers
   * @readonly
   *
   * @description
   * Providers de connexion
   *
   * @access public
   * @memberof AuthLoginFormComponent
   * @since 1.0.0
   *
   * @type {Signal<AuthProvider[]>} providers
   */
  public readonly providers: Signal<AuthProvider[]> = signal<AuthProvider[]>([
    {
      id: 'google',
      name: 'Google',
      icon: 'pi pi-google'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'pi pi-microsoft'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'pi pi-apple'
    },
  ]);
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

    this.store.dispatch(login({
      credentials: {
        email: this.form.value.email!,
        password: this.form.value.password!
      }
    }))
  }
  //#endregion
}
