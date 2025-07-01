import { afterRenderEffect, computed, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2, Signal, signal, WritableSignal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

/**
 * Type ShortcutHandler
 * @type ShortcutHandler
 *
 * @description
 * Type représentant une fonction de
 * gestionnaire de raccourci de clavier.
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type ShortcutHandler = (event: KeyboardEvent) => void;

/**
 * Type ShortcutBinding
 * @type ShortcutBinding
 *
 * @description
 * Type représentant une liaison de
 * raccourci de clavier.
 *
 * @version 1.0.0
 *
 * @property {string} name - Nom du raccourci de clavier
 * @property {string} label - Label du raccourci de clavier
 * @property {string[]} keys - Clés du raccourci de clavier
 * @property {ShortcutHandler} handler - Gestionnaire de raccourci de clavier
 * @property {boolean} preventDefault - Empêche le comportement par défaut
 * @property {boolean} stopPropagation - Empêche la propagation de l'événement
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type ShortcutBinding = {
  //#region Propriétés
  /**
   * Propriété name
   * 
   * @description
   * Nom du raccourci de clavier
   * 
   * @memberof ShortcutBinding
   * @since 1.0.0
   * 
   * @type {string} name
   */
  name: string;

  /**
   * Propriété label
   *
   * @description
   * Label du raccourci de clavier
   * 
   * @memberof ShortcutBinding
   * @since 1.0.0
   * 
   * @type {string} label
   */
  label: string;

  /**
   * Propriété keys
   *
   * @description
   * Clés du raccourci de clavier
   * 
   * @memberof ShortcutBinding
   * @since 1.0.0
   * 
   * @type {string[]} keys
   */
  keys: string[];

  /**
   * Propriété handler
   * @type ShortcutHandler
   *
   * @description
   * Gestionnaire de raccourci de clavier
   * 
   * @memberof ShortcutBinding
   * @since 1.0.0
   * 
   * @type {ShortcutHandler} handler
   */
  handler: ShortcutHandler;

  /**
   * Propriété description
   *
   * @description
   * Description du raccourci de clavier
   * 
   * @memberof ShortcutBinding
   * @since 1.0.0
   * 
   * @type {string} description
   */
  description: string;
  //#endregion
}

/**
 * Type ShortcutBindings
 * @type ShortcutBindings
 *
 * @description
 * Type représentant un tableau de
 * raccourcis de clavier
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
export type ShortcutBindings = ShortcutBinding[];

/**
 * Service KeyboardShortcutService
 * @class KeyboardShortcutService
 *
 * @description
 * Service de gestion des raccourcis de clavier
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Injectable({ providedIn: 'root' })
export class KeyboardShortcutService {
  //#region Propriétés
  /**
   * Propriété platformId
   * @readonly
   *
   * @description
   * ID de la plateforme
   *
   * @access private
   * @memberof KeyboardShortcutService
   * @since 1.0.0
   *
   * @type {Object} platformId
   */
  private readonly platformId: Object =
    inject<Object>(PLATFORM_ID);

  /**
   * Propriété renderer
   * @readonly
   *
   * @description
   * Renderer
   *
   * @access private
   * @memberof KeyboardShortcutService
   * @since 1.0.0
   *
   * @type {Renderer2} renderer
   */
  private readonly renderer: Renderer2;

  /**
   * Propriété rendererFactory
   * @readonly
   *
   * @description
   * RendererFactory
   *
   * @access private
   * @memberof KeyboardShortcutService
   * @since 1.0.0
   *
   * @type {RendererFactory2} rendererFactory
   */
  private readonly rendererFactory: RendererFactory2 =
    inject<RendererFactory2>(RendererFactory2);

  /**
   * Propriété shortcuts
   * @readonly
   *
   * @description
   * Tableau de raccourcis de clavier
   *
   * @access private
   * @memberof KeyboardShortcutService
   * @since 1.0.0
   *
   * @type {WritableSignal<ShortcutBindings>} shortcuts
   */
  private readonly shortcuts: WritableSignal<ShortcutBindings> =
    signal<ShortcutBindings>([]);
  //#endregion

  //#region Constructeur
  /**
   * Constructeur
   * @constructor
   *
   * @description
   * Constructeur pour initialiser
   * le service.
   *
   * @access public
   * @memberof KeyboardShortcutService
   * @since 1.0.0
   */
  public constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    afterRenderEffect(() => {
      const shortcuts: ShortcutBindings = this.shortcuts();
      this.setupKeyboardShortcuts();
    });
  }
  //#endregion

  //#region Méthodes
  /**
   * Méthode setupKeyboardShortcuts
   * @method setupKeyboardShortcuts
   *
   * @description
   * Méthode setupKeyboardShortcuts pour
   * configurer les raccourcis de clavier.
   *
   * @access private
   * @memberof KeyboardShortcutService
   * @since 1.0.0
   *
   * @returns {void} - Retourne rien
   */
  private setupKeyboardShortcuts(): void {
    /**
     * Constante shortcuts
     *
     * @description
     * Les raccourcis de clavier à
     * configurer
     *
     * @type {ShortcutBindings} shortcuts
     */
    const shortcuts: ShortcutBindings = this.shortcuts();

    // Configuration des raccourcis de clavier
    for (const shortcut of shortcuts) {
      this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
        const keys: Record<string, boolean> = {
          ctrl: event.ctrlKey,
          alt: event.altKey,
          shift: event.shiftKey,
          meta: event.metaKey,
          [event.key.toLocaleLowerCase()]: true
        }

        const allKeysPressed: boolean = shortcut.keys.every(key => 
          keys[key.toLowerCase()]
        );

        if (allKeysPressed) {
          shortcut.handler(event);
        }
      });
    }
  }

  /**
   * Méthode addShortcut
   * @method addShortcut
   *
   * @description
   * Méthode addShortcut pour ajouter
   * un raccourci de clavier.
   *
   * @access public
   * @memberof KeyboardShortcutService
   * @since 1.0.0
   *
   * @param {ShortcutBinding} shortcut - Raccourci de clavier à ajouter
   *
   * @returns {void} - Retourne rien
   */
  public addShortcut(shortcut: ShortcutBinding): void {
    this.shortcuts.update((shortcuts) => ({
      ...shortcuts,
      shortcut
    }));
  }

  /**
   * Méthode addShortcuts
   * @method addShortcuts
   *
   * @description
   * Méthode addShortcuts pour ajouter
   * plusieurs raccourcis de clavier.
   *
   * @access public
   * @memberof KeyboardShortcutService
   * @since 1.0.0
   *
   * @param {ShortcutBindings} shortcuts - Raccourcis de clavier à ajouter
   *
   * @returns {void} - Retourne rien
   */
  public addShortcuts(shortcuts: ShortcutBindings): void {
    this.shortcuts.update((currentShortcuts) => ([
      ...currentShortcuts,
      ...shortcuts
    ]));
  }

  /**
   * Méthode removeShortcut
   * @method removeShortcut
   *
   * @description
   * Méthode removeShortcut pour supprimer
   * un raccourci de clavier.
   *
   * @access public
   * @memberof KeyboardShortcutService
   * @since 1.0.0
   *
   * @param {string} name - Nom du raccourci de clavier à supprimer
   *
   * @returns {void} - Retourne rien
   */
  public removeShortcut(name: string): void {
    this.shortcuts.update((shortcuts) => shortcuts.filter(
      (shortcut) => shortcut.name !== name
    ));
  }
  //#endregion
}
