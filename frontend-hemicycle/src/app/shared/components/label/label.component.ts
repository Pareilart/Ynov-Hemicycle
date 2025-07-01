import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.css'
})
export class LabelComponent {
  //#region Propriétés
  /**
   * Propriété required
   * @readonly
   *
   * @description
   * Propriété required pour indiquer
   * si le label est requis.
   *
   * @access public
   * @memberof LabelComponent
   * @since 1.0.0
   *
   * @returns {InputSignal<boolean>} - Retourne la propriété required
   */
  public readonly required: InputSignal<boolean> =
    input<boolean>(false);

  /**
   * Propriété label
   * @readonly
   *
   * @description
   * Propriété label pour indiquer
   * le label du champ.
   *
   * @access public
   * @memberof LabelComponent
   * @since 1.0.0
   *
   * @returns {InputSignal<string | null>} - Retourne la propriété label
   */
  public readonly label: InputSignal<string | null> =
    input<string | null>(null);

  /**
   * Propriété for
   * @readonly
   *
   * @description
   * Propriété for pour indiquer
   * le for du champ.
   *
   * @access public
   * @memberof LabelComponent
   * @since 1.0.0
   *
   * @returns {InputSignal<string | null>} - Retourne la propriété for
   */
  public readonly for: InputSignal<string | null> =
    input<string | null>(null);
  //#endregion
}
