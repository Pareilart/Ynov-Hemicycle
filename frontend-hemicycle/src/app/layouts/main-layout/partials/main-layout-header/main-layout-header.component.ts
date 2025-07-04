import { CommonModule, isPlatformBrowser } from '@angular/common';
import { afterRenderEffect, Component, computed, DestroyRef, effect, EffectCleanupRegisterFn, ElementRef, inject, input, InputSignal, PLATFORM_ID, Signal, signal, viewChild, WritableSignal, ViewChild, OnInit  } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router';
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
import { AuthState } from '@app/core/stores/auth/auth.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '@app/core/stores/auth/auth.actions';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout-header',
  imports: [
    CommonModule,
    RouterModule,
    MegaMenuModule,
    MenuModule,
    BadgeModule,
    AvatarModule,
    ButtonModule,
    BreadcrumbModule
  ],
  templateUrl: './main-layout-header.component.html',
  styleUrl: './main-layout-header.component.css',
})
export class MainLayoutHeaderComponent implements OnInit {
  //#region Propriétés
  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Stocke l'état de l'authentification
   *
   * @access private
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   *
   * @type {Store<AuthState>} store
   */
  private readonly store: Store<AuthState> =
    inject<Store<AuthState>>(Store<AuthState>);
  //#endregion

  @ViewChild('profileMenuContainer', { static: true }) profileMenuContainer!: ElementRef;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public profileMenuItems = [
    { label: 'Mon profil', icon: 'pi pi-user', command: () => this.goToProfile() },
    { separator: true },
    { label: 'Déconnexion', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  goToProfile() {
    // Navigation vers le profil
    this.router.navigate(['/account/profil']);
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
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
   * Service de titre
   *
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   *
   * @type {Title} title
   */
  public readonly title: Title = inject<Title>(Title);

  /**
   * Propriété breadcrumbItems
   *
   * @description
   * Éléments du fil d'Ariane
   *
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   *
   * @type {MenuItem[]} breadcrumbItems
   */
  public breadcrumbItems: MenuItem[] = [];

  /**
   * Propriété home
   * @readonly
   *
   * @description
   * Élément d'accueil du fil d'Ariane
   *
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   *
   * @type {MenuItem} home
   */
  public readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

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

  /**
   * Méthode ngOnInit
   *
   * @description
   * Initialise le composant
   *
   * @access public
   * @memberof MainLayoutHeaderComponent
   * @since 1.0.0
   *
   * @returns {void} void
   */
  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        if (data['breadcrumb']) {
          this.breadcrumbItems = data['breadcrumb'];
        } else {
          this.breadcrumbItems = [];
        }
      });
  }
}
