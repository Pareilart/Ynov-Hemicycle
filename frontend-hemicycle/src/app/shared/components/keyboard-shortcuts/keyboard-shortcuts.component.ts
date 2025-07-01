import { afterRenderEffect, Component, inject, input, InputSignal } from '@angular/core';
import { KeyboardShortcutService, ShortcutBindings } from '@shared/services/keyboard-shortcut.service';

@Component({
  selector: 'app-keyboard-shortcuts',
  imports: [],
  templateUrl: './keyboard-shortcuts.component.html',
  styleUrl: './keyboard-shortcuts.component.css'
})
export class KeyboardShortcutsComponent {
  //#region Propriétés
  /**
   * Propriété shortcuts
   * @readonly
   *
   * @description
   * Tableau de raccourcis de clavier
   *
   * @access public
   * @memberof KeyboardShortcutsComponent
   * @since 1.0.0
   *
   * @type {InputSignal<ShortcutBindings>} shortcuts
   */
  public readonly shortcuts: InputSignal<ShortcutBindings> =
    input.required<ShortcutBindings>();

  /**
   * Propriété keyboardShortcutService
   * @readonly
   *
   * @description
   * Service de gestion des raccourcis de clavier
   *
   * @access private
   * @memberof KeyboardShortcutsComponent
   * @since 1.0.0
   *
   * @type {KeyboardShortcutService} keyboardShortcutService
   */
  private readonly keyboardShortcutService: KeyboardShortcutService =
    inject<KeyboardShortcutService>(KeyboardShortcutService);
  //#endregion

  //#region Constructeur
  /**
   * Constructeur
   * @constructor
   *
   * @description
   * Constructeur pour initialiser
   * le composant.
   *
   * @access public
   * @memberof KeyboardShortcutsComponent
   * @since 1.0.0
   */
  public constructor() {
    afterRenderEffect(() => {
      const shortcuts: ShortcutBindings = this.shortcuts();
      this.keyboardShortcutService.addShortcuts(shortcuts);
    });
  }
  //#endregion
}
