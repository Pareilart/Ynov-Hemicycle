import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-form-input-label',
  imports: [],
  templateUrl: './form-input-label.component.html',
  styleUrl: './form-input-label.component.css'
})
export class FormInputLabelComponent {
  //#region Propriétés
  /**
   * Propriété label
   * @readonly
   *
   * @description
   * Label du champ
   *
   * @access public
   * @memberof FormInputLabelComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string>} label
   */
  public readonly label: InputSignal<string> =
    input.required<string>();

  /**
   * Propriété required
   * @readonly
   *
   * @description
   * Indique si le champ est obligatoire
   *
   * @access public
   * @memberof FormInputLabelComponent
   * @since 1.0.0
   *
   * @type {InputSignal<boolean>} required
   */
  public readonly required: InputSignal<boolean> =
    input.required<boolean>();

  /**
   * Propriété labelFor
   * @readonly
   *
   * @description
   * Id de l'élément associé
   *
   * @access public
   * @memberof FormInputLabelComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string>} labelFor
   */
  public readonly labelFor: InputSignal<string> =
    input.required<string>();
  //#endregion
}
