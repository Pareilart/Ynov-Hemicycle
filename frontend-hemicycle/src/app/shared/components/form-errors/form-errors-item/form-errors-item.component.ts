import { Component, inject, input, InputSignal, Signal, TemplateRef, viewChild } from '@angular/core';
import { FormErrorsComponent } from '../form-errors.component';

@Component({
  selector: 'app-form-errors-item',
  imports: [],
  templateUrl: './form-errors-item.component.html',
  styleUrl: './form-errors-item.component.css'
})
export class FormErrorsItemComponent {
  //#region Propriétés
  /**
   * Propriété validator
   * @readonly
   *
   * @description
   * Définit le validateur à afficher
   *
   * @access public
   * @memberof FormErrorsItemComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string>} validator
   */
  public readonly validator: InputSignal<string> =
    input.required<string>();

  /**
   * Propriété container
   * @readonly
   *
   * @description
   * Définit le composant parent
   *
   * @access public
   * @memberof FormErrorsItemComponent
   * @since 1.0.0
   *
   * @type {FormErrorsComponent} container
   */
  public readonly container: FormErrorsComponent =
    inject<FormErrorsComponent>(FormErrorsComponent);

  /**
   * Propriété template
   * @readonly
   *
   * @description
   * Définit le template à afficher
   *
   * @access public
   * @memberof FormErrorsItemComponent
   * @since 1.0.0
   *
   * @type {Signal<TemplateRef<any>>} template
   */
  public readonly template: Signal<TemplateRef<any>> =
    viewChild.required<TemplateRef<any>>(TemplateRef);
  //#endregion
}
