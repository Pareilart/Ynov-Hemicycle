import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieSettingsComponent } from '@shared/components/cookie-settings/cookie-settings.component';
import { MetaService } from '@core/services/meta.service';
import { LocalStorageService } from 'ngx-webstorage';
import { REFRESH_TOKEN_KEY } from '@core/constants/storage-keys.constant';
import { Store } from '@ngrx/store';
import { refresh } from '@core/stores/auth/auth.actions';
import { isPlatformBrowser } from '@angular/common';
import { AuthState } from './core/stores/auth/auth.state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookieSettingsComponent],
  template: `
    <router-outlet/>
    <app-cookie-settings/>
  `,
})
export class AppComponent {
  //#region Propriétés
  /**
   * Propriété metaService
   * @readonly
   *
   * @description
   * Service de gestion des metadonnées
   * de l'application
   *
   * @access protected
   * @memberof AppComponent
   * @since 1.0.0
   *
   * @type {MetaService} metaService
   */
  protected readonly metaService: MetaService =
    inject<MetaService>(MetaService);

  private readonly platformId: Object = inject<Object>(PLATFORM_ID);

  private readonly localStorageService: LocalStorageService =
    inject<LocalStorageService>(LocalStorageService);

  private readonly store: Store<AuthState> =
    inject<Store<AuthState>>(Store<AuthState>);

  private readonly refreshToken: string | null = this.localStorageService.retrieve(REFRESH_TOKEN_KEY);
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   * @method ngOnInit
   *
   * @description
   * Méthode de cycle de vie ngOnInit
   *
   * @access public
   * @memberof AppComponent
   * @since 1.0.0
   *
   * @returns {void} - Retourne void
   */
  public ngOnInit(): void {

    if (this.refreshToken) {
      this.store.dispatch(refresh({ refreshToken: this.refreshToken }));
    }
  }
}
