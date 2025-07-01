import { CommonModule, isPlatformBrowser } from '@angular/common';
import { afterRenderEffect, Component, computed, DestroyRef, effect, EffectCleanupRegisterFn, ElementRef, inject, input, InputSignal, PLATFORM_ID, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@environments/environment';
import { MegaMenuItem, PrimeIcons } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { ScrollDispatcher, ViewportRuler, ViewportScrollPosition } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout-header',
  imports: [
    CommonModule,
    RouterModule,
    MegaMenuModule,
  ],
  templateUrl: './main-layout-header.component.html',
  styleUrl: './main-layout-header.component.css',
})
export class MainLayoutHeaderComponent {
  //#region Propriétés
  /**
   * Propriété appName
   * @readonly
   *
   * @description
   * Nom de l'application
   *
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   *
   * @type {string} appName
   */
  public readonly appName: string = environment.application.name;

  /**
   * Propriété items
   * @readonly
   *
   * @description
   * Éléments de la navigation de l'en-tête
   *
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   *
   * @type {Signal<MegaMenuItem[]>} items
   */
  public readonly items: Signal<MegaMenuItem[]> = signal<MegaMenuItem[]>([
    {
      label: "Les projets de lois",
      icon: PrimeIcons.USER,
      items: [
        [
          {
            label: "Les projets de lois",
            items: [
              { label: 'Liste des projets de loi', icon: PrimeIcons.ANDROID, routerLink: '/legislation/laws' },
            ]
          },
          {
            label: "Les projets de lois",
            items: [
              { label: 'Circonscription', icon: PrimeIcons.ANDROID, routerLink: '/legislation/circonscription' },
            ]
          },
        ],
      ]
    },
    {
      label: "Les partis politiques",
      icon: PrimeIcons.PLUS,
      routerLink: '/partis-politiques'
    }
  ]);

  /**
   * Propriété logo
   * @readonly
   *
   * @description
   * Chemin de l'image du logo
   *
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   *
   * @type {string} logo
   */
  public readonly logo: string = "images/logo.jpg";
  //#endregion
}
