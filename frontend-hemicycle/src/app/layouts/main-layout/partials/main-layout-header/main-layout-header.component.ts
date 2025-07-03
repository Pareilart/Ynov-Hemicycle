import { CommonModule, isPlatformBrowser } from '@angular/common';
import { afterRenderEffect, Component, computed, DestroyRef, effect, EffectCleanupRegisterFn, ElementRef, inject, input, InputSignal, PLATFORM_ID, Signal, signal, viewChild, WritableSignal, ViewChild  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@environments/environment';
import { MegaMenuItem, PrimeIcons } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { ScrollDispatcher, ViewportRuler, ViewportScrollPosition } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main-layout-header',
  imports: [
    CommonModule,
    RouterModule,
    MegaMenuModule,
    MenuModule,
    BadgeModule,
    AvatarModule,
    ButtonModule  
  ],
  templateUrl: './main-layout-header.component.html',
  styleUrl: './main-layout-header.component.css',
})
export class MainLayoutHeaderComponent {

  @ViewChild('profileMenuContainer', { static: true }) profileMenuContainer!: ElementRef;
  constructor(private router: Router) {}

  profileMenuItems = [
    { label: 'Mon profil', icon: 'pi pi-user', command: () => this.goToProfile() },
    { label: 'Paramètres', icon: 'pi pi-cog', command: () => this.goToSettings() },
    { separator: true },
    { label: 'Déconnexion', icon: 'pi pi-sign-out', }
  ];

  goToProfile() {
    // Navigation vers le profil
    this.router.navigate(['/profil/user']);
  }

  goToSettings() {
    // Navigation vers paramètres
    this.router.navigate(['/settings']);
  }


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
   * Propriété title
   * @readonly
   *
   * @description
   * Titre de la page
   *
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   *
   * @type {Title} title
   */
  public readonly title: Title = inject<Title>(Title);

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
      routerLink: '/political/party'
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
