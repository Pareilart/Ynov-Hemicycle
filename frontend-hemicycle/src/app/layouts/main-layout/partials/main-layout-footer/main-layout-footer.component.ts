import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-main-layout-footer',
  imports: [],
  templateUrl: './main-layout-footer.component.html',
  styleUrl: './main-layout-footer.component.css'
})
export class MainLayoutFooterComponent {
  //#region Propriétés
  /**
   * Propriété appName
   * @readonly
   *
   * @description
   * Nom de l'application
   *
   * @access public
   * @memberof MainLayoutFooterComponent
   * @since 1.0.0
   *
   * @type {string} appName
   */
  public readonly appName: string = environment.application.name;

  /**
   * Propriété appVersion
   * @readonly
   *
   * @description
   * Version de l'application
   *
   * @access public
   * @memberof MainLayoutFooterComponent
   * @since 1.0.0
   *
   * @type {string} appVersion
   */
  public readonly appVersion: string = environment.application.version;
  //#endregion
}
