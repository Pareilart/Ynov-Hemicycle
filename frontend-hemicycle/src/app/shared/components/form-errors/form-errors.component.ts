import { Component, computed, contentChildren, input, InputSignal, Signal } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { FormErrorsItemComponent } from './form-errors-item/form-errors-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-errors',
  imports: [CommonModule],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.css'
})
export class FormErrorsComponent {
  //#region Propriétés
  /**
   * Propriété control
   * @readonly
   *
   * @description
   * Définit le contrôle à afficher
   *
   * @access public
   * @memberof FormErrorsComponent
   * @since 1.0.0
   *
   * @type {InputSignal<AbstractControl<any, any>>} control
   */
  public readonly control: InputSignal<AbstractControl<any, any>> =
    input.required<AbstractControl<any, any>>();

  /**
   * Propriété help
   * @readonly
   *
   * @description
   * Définit le message d'aide à afficher
   *
   * @access public
   * @memberof FormErrorsComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string | null>} help
   */
  public readonly help: InputSignal<string | null> =
    input<string | null>(null);

  /**
   * Propriété errors
   * @readonly
   *
   * @description
   * Définit les erreurs à afficher
   *
   * @access public
   * @memberof FormErrorsComponent
   * @since 1.0.0
   *
   * @type {Signal<ValidationErrors>} errors
   */
  public readonly errors: Signal<ValidationErrors> = computed(() => {
    const control = this.control();
    return control.errors || {};
  });

  /**
   * Propriété items
   * @readonly
   *
   * @description
   * Définit les éléments à afficher
   *
   * @access public
   * @memberof FormErrorsComponent
   * @since 1.0.0
   *
   * @type {Signal<readonly FormErrorsItemComponent[]>} items
   */
  public readonly items: Signal<readonly FormErrorsItemComponent[]> =
    contentChildren<FormErrorsItemComponent>(FormErrorsItemComponent);
  //#endregion
}
