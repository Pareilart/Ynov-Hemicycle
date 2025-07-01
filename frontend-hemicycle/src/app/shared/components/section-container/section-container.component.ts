import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-section-container',
  imports: [],
  templateUrl: './section-container.component.html',
  styleUrl: './section-container.component.css'
})
export class SectionContainerComponent {
  //#region Propriétés
  /**
   * Propriété styleClass
   * @readonly
   *
   * @description
   * Classe de style
   *
   * @access public
   * @memberof SectionContainerComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string | string[]>}
   */
  public readonly styleClass: InputSignal<string | string[]> =
    input<string | string[]>('bg-surface-0');
  //#endregion
}
