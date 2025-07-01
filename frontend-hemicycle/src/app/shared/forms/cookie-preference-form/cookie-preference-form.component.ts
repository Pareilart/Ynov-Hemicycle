import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StopPropagationDirective } from '@shared/directives/stop-propagation.directive';
import { type CookieConsentPreference, CookieConsentService } from '@app/core/services/cookie-consent.service';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

/**
 * Type CookiePreferenceFormValues
 * @type CookiePreferenceFormValues
 *
 * @description
 * Type représentant les valeurs du
 * formulaire de préférence de cookies
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 *
 * @see CookieConsentPreference
 */
export type CookiePreferenceFormValues = CookieConsentPreference;

/**
 * Type CookiePreferenceFormControls
 * @type CookiePreferenceFormControls
 *
 * @description
 * Type représentant les contrôles du
 * formulaire de préférence de cookies
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
type CookiePreferenceFormControls = {
  [K in keyof CookiePreferenceFormValues]: FormControl<CookiePreferenceFormValues[K]>;
};

@Component({
  selector: 'app-cookie-preference-form',
  imports: [
    ReactiveFormsModule,
    AccordionModule,
    ButtonModule,
    ToggleSwitchModule,
    StopPropagationDirective
  ],
  templateUrl: './cookie-preference-form.component.html',
  styleUrl: './cookie-preference-form.component.css'
})
export class CookiePreferenceFormComponent implements OnInit {
  //#region Propriétés
  /**
   * Propriété formBuilder
   * @readonly
   *
   * @description
   * Service de formulaire
   *
   * @access private
   * @memberof CookiePreferenceFormComponent
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
   * Formulaire de préférence de cookies
   *
   * @access public
   * @memberof CookiePreferenceFormComponent
   * @since 1.0.0
   *
   * @type {FormGroup<CookiePreferenceFormControls>} form
   */
  public readonly form: FormGroup<CookiePreferenceFormControls> = this.formBuilder.group({
    necessary: this.formBuilder.control<boolean>({
      value: true,
      disabled: true
    }, [Validators.requiredTrue]),
    analytics: this.formBuilder.control<boolean>({
      value: false,
      disabled: false
    }),
    marketing: this.formBuilder.control<boolean>({
      value: false,
      disabled: false
    }),
    functionality: this.formBuilder.control<boolean>({
      value: false,
      disabled: false
    })
  });

  /**
   * Propriété CookieConsentService
   * @readonly
   *
   * @description
   * Service de consentement
   *
   * @access private
   * @memberof CookiePreferenceFormComponent
   * @since 1.0.0
   *
   * @type {CookieConsentService} CookieConsentService
   */
  private readonly CookieConsentService: CookieConsentService =
    inject<CookieConsentService>(CookieConsentService);
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   * @method ngOnInit
   *
   * @description
   * Méthode ngOnInit pour initialiser
   * le composant.
   *
   * @access public
   * @memberof CookiePreferenceFormComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Méthode initializeForm
   * @method initializeForm
   *
   * @description
   * Méthode initializeForm pour initialiser
   * le formulaire de préférence de cookies.
   *
   * @access private
   * @memberof CookiePreferenceFormComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  private initializeForm(): void {
    if (!this.CookieConsentService.hasConsent()) return;

    const consent: CookieConsentPreference = this.CookieConsentService.consent();

    this.form.setValue(consent, {
      emitEvent: false
    });
  }

  /**
   * Méthode onSubmit
   * @method onSubmit
   *
   * @description
   * Méthode onSubmit pour soumettre
   * le formulaire de préférence de cookies.
   *
   * @access public
   * @memberof CookiePreferenceFormComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public onSubmit(): void {
    if (this.form.invalid) return;

    /**
     * Mise à jour du consentement
     * des cookies
     *
     * @see CookieConsentService#updateConsent
     */
    this.CookieConsentService.updateConsent(this.form.value);
  }
  //#endregion
}
