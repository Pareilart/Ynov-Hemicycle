import { computed, inject, Injectable, Signal } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { toSignal } from "@angular/core/rxjs-interop";

/**
 * Type CookieConsentPreference
 * @type CookieConsentPreference
 *
 * @description
 * Type CookieConsentPreference pour stocker les préférences de consentement
 *
 * @version 1.0.0
 *
 * @property {boolean} marketing - Consentement marketing
 * @property {boolean} analytics - Consentement analytics
 * @property {boolean} functionality - Consentement fonctionnel
 *
 * @example
 * ```typescript
 * const CookieConsentPreference: CookieConsentPreference = {
 *   marketing: true,
 *   analytics: true,
 *   functionality: true
 * };
 * ```
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type CookieConsentPreference = {
  //#region Propriétés
  /**
   * Propriété necessary
   *
   * @description
   * Consentement essentiel
   *
   * @memberof CookieConsentPreference
   * @since 1.0.0
   *
   * @type {boolean} necessary
   */
  necessary: boolean;

  /**
   * Propriété marketing
   *
   * @description
   * Consentement marketing
   *
   * @memberof CookieConsentPreference
   * @since 1.0.0
   *
   * @type {boolean} marketing
   */
  marketing: boolean;

  /**
   * Propriété analytics
   *
   * @description
   * Consentement analytics
   *
   * @memberof CookieConsentPreference
   * @since 1.0.0
   *
   * @type {boolean} analytics
   */
  analytics: boolean;

  /**
   * Propriété functionality
   * @readonly
   *
   * @description
   * Consentement fonctionnel
   *
   * @memberof CookieConsentPreference
   * @since 1.0.0
   *
   * @type {boolean} functionality
   */
  functionality: boolean;
  //#endregion
}

/**
 * Service CookieConsentService
 * @class CookieConsentService
 *
 * @description
 * Service permettant de gérer les
 * préférences de consentement
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  //#region Propriétés
  /**
   * Propriété CONSENT_KEY
   * @readonly
   *
   * @description
   * Stocke la clé du stockage local
   * pour les préférences de consentement
   *
   * @access private
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {string} CONSENT_KEY
   */
  private static readonly CONSENT_KEY: string = 'consent_preferences';

  /**
   * Propriété CONSENT_GIVEN_KEY
   * @readonly
   *
   * @description
   * Stocke la clé du stockage local
   * pour le fait que les préférences
   * de consentement ont été données
   *
   * @access private
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {string} CONSENT_GIVEN_KEY
   */
  private static readonly CONSENT_GIVEN_KEY: string = 'consent_given';

  /**
   * Propriété storageService
   * @readonly
   *
   * @description
   * Service de stockage local
   *
   * @access private
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {LocalStorageService} storageService
   */
  private readonly storageService: LocalStorageService =
    inject<LocalStorageService>(LocalStorageService);

  /**
   * Propriété consent
   * @readonly
   *
   * @description
   * Stocke les préférences de consentement
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {Signal<CookieConsentPreference>} consent
   */
  public readonly consent: Signal<CookieConsentPreference> = toSignal(
    this.storageService.observe(CookieConsentService.CONSENT_KEY),
    { initialValue: this.getConsent() }
  );

  /**
   * Propriété consentGiven
   * @readonly
   *
   * @description
   * Stocke le fait que les préférences
   * de consentement ont été données
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {Signal<boolean>} consentGiven
   */
  public readonly consentGiven: Signal<boolean> = toSignal(
    this.storageService.observe(CookieConsentService.CONSENT_GIVEN_KEY),
    { initialValue: this.getConsentGiven() }
  );

  /**
   * Propriété hasConsent
   * @readonly
   *
   * @description
   * Stocke le fait que les préférences
   * de consentement existent
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {Signal<boolean>} hasConsent
   */
  public readonly hasConsent: Signal<boolean> =
    computed(() => !!this.consent());

  /**
   * Propriété hasMarketingConsent
   * @readonly
   *
   * @description
   * Stocke le fait que le consentement
   * marketing existe
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {Signal<boolean>} hasMarketingConsent
   */
  public readonly hasMarketingConsent: Signal<boolean> =
    computed(() => !!this.consent()?.marketing);

  /**
   * Propriété hasAnalyticsConsent
   * @readonly
   *
   * @description
   * Stocke le fait que le consentement
   * analytics existe
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {Signal<boolean>} hasAnalyticsConsent
   */
  public readonly hasAnalyticsConsent: Signal<boolean> =
    computed(() => !!this.consent()?.analytics);

  /**
   * Propriété hasFunctionalityConsent
   * @readonly
   *
   * @description
   * Stocke le fait que le consentement
   * fonctionnel existe
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {Signal<boolean>} hasFunctionalityConsent
   */
  public readonly hasFunctionalityConsent: Signal<boolean> =
    computed(() => !!this.consent()?.functionality);

  /**
   * Propriété hasConsentGiven
   * @readonly
   *
   * @description
   * Stocke le fait que les préférences
   * de consentement ont été données
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @type {Signal<boolean>} hasConsentGiven
   */
  public readonly hasConsentGiven: Signal<boolean> =
    computed(() => !!this.consentGiven());
  //#endregion

  //#region Méthodes
  /**
   * Méthode getConsent
   * @method getConsent
   *
   * @description
   * Méthode getConsent pour récupérer
   * les préférences de consentement
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @returns {ConsentPreference} - Retourne les préférences de consentement
   */
  public getConsent(): CookieConsentPreference {
    return this.storageService.retrieve(CookieConsentService.CONSENT_KEY);
  }

  /**
   * Méthode setConsent
   * @method setConsent
   *
   * @description
   * Méthode setConsent pour stocker
   * les préférences de consentement
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @param {ConsentPreference} consent - Préférences de consentement
   *
   * @returns {void} - Retourne rien
   */
  public setConsent(consent: CookieConsentPreference): void {
    this.setConsentGiven(true);
    this.storageService.store(
      CookieConsentService.CONSENT_KEY,
      consent
    );
  }

  /**
   * Méthode updateConsent
   * @method updateConsent
   *
   * @description
   * Méthode updateConsent pour mettre à jour
   * les préférences de consentement
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @param {Partial<CookieConsentPreference>} consent - Préférences de consentement partielles
   *
   * @returns {void} - Retourne rien
   */
  public updateConsent(consent: Partial<CookieConsentPreference>): void {
    this.setConsentGiven(true);

    const currentConsent: CookieConsentPreference = this.consent() || {
      necessary: false,
      marketing: false,
      analytics: false,
      functionality: false
    };

    this.setConsent({
      ...currentConsent,
      ...consent
    });
  }

  /**
   * Méthode resetConsent
   * @method resetConsent
   *
   * @description
   * Méthode resetConsent pour réinitialiser les préférences de consentement
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public resetConsent(): void {
    this.setConsentGiven(false);
    this.storageService.clear(CookieConsentService.CONSENT_KEY);
  }

  /**
   * Méthode setConsentGiven
   * @method setConsentGiven
   *
   * @description
   * Méthode setConsentGiven pour stocker
   * le fait que les préférences de consentement
   * ont été données
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @param {boolean} consentGiven - Consentement donné
   *
   * @returns {void} - Retourne rien
   */
  public setConsentGiven(consentGiven: boolean): void {
    this.storageService.store(
      CookieConsentService.CONSENT_GIVEN_KEY,
      consentGiven
    );
  }

  /**
   * Méthode getConsentGiven
   * @method getConsentGiven
   *
   * @description
   * Méthode getConsentGiven pour récupérer
   * le fait que les préférences de consentement
   * ont été données
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @returns {boolean} - Consentement donné
   */
  public getConsentGiven(): boolean {
    return this.storageService.retrieve(CookieConsentService.CONSENT_GIVEN_KEY);
  }

  /**
   * Méthode acceptAll
   * @method acceptAll
   *
   * @description
   * Méthode acceptAll pour accepter
   * tous les cookies
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public acceptAll(): void {
    this.setConsentGiven(true);

    this.setConsent({
      necessary: true,
      marketing: true,
      analytics: true,
      functionality: true
    });
  }

  /**
   * Méthode rejectAll
   * @method rejectAll
   *
   * @description
   * Méthode rejectAll pour refuser
   * tous les cookies
   *
   * @access public
   * @memberof CookieConsentService
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  public rejectAll(): void {
    this.setConsentGiven(true);

    this.setConsent({
      necessary: true,
      marketing: false,
      analytics: false,
      functionality: false
    });
  }
  //#endregion
}
