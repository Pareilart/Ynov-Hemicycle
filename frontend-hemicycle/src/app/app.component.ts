import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieSettingsComponent } from '@shared/components/cookie-settings/cookie-settings.component';
import { MetaService } from '@core/services/meta.service';
import { Store } from '@ngrx/store';
import { AuthState } from './core/stores/auth/auth.state';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { REFRESH_TOKEN_KEY } from './core/constants/sotrage-keys.constant';
import { refresh } from './core/stores/auth/auth.actions';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookieSettingsComponent],
  template: `
    <router-outlet/>
    <app-cookie-settings/>
  `,
})
export class AppComponent implements OnInit {
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

  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Store de l'authentification
   *
   * @access private
   * @memberof AppComponent
   * @since 1.0.0
   *
   * @type {Store<AuthState>} store
   */
  private readonly store: Store<AuthState> =
    inject<Store<AuthState>>(Store<AuthState>);

  /**
   * Propriété localStorageService
   * @readonly
   *
   * @description
   * Service de stockage local
   *
   * @access private
   * @memberof AppComponent
   * @since 1.0.0
   *
   * @type {LocalStorageService} localStorageService
   */
  private readonly localStorageService: LocalStorageService =
    inject<LocalStorageService>(LocalStorageService);

  private readonly platformId: Object =
    inject<Object>(PLATFORM_ID);
  //#endregion

  //#region Méthodes
  public ngOnInit(): void {
  //   if (!isPlatformBrowser(this.platformId)) {
  //     return;
  //   }

  //   const refreshToken: string | null = this.localStorageService.retrieve(REFRESH_TOKEN_KEY);

  //   if (!refreshToken) {
  //     return;
  //   }

  //   this.store.dispatch(refresh({ refreshToken }));
  }
  //#endregion
}
