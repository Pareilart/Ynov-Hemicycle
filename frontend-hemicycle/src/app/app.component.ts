import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieSettingsComponent } from '@shared/components/cookie-settings/cookie-settings.component';
import { MetaService } from '@core/services/meta.service';

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
  //#endregion
}
