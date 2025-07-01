import { Directive, HostListener } from '@angular/core';

/**
 * Directive StopPropagation
 * @class StopPropagationDirective
 *
 * @description
 * Directive StopPropagation pour stopper la propagation de l'événement
 *
 * @version 1.0.0
 *
 * @author Valentin FORTIN <contact@valentin-fortin.pro>
 */
@Directive({
  selector: '[appStopPropagation]'
})
export class StopPropagationDirective {
  //#region Méthodes
  /**
   * Méthode onClick
   * @method onClick
   *
   * @description
   * Méthode onClick pour stopper la
   * propagation de l'événement
   *
   * @access public
   * @memberof StopPropagationDirective
   * @since 1.0.0
   *
   * @param {MouseEvent} event - L'événement de clic
   *
   * @return {void} Ne retourne rien
   */
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  /**
   * Méthode onChange
   * @method onChange
   *
   * @description
   * Méthode onChange pour stopper la
   * propagationde l'événement
   *
   * @access public
   * @memberof StopPropagationDirective
   * @since 1.0.0
   *
   * @param {Event} event - L'événement de changement
   *
   * @return {void} Ne retourne rien
   */
  @HostListener('change', ['$event'])
  public onChange(event: Event): void {
    event.stopPropagation();
  }

  /**
   * Méthode onInput
   * @method onInput
   *
   * @description
   * Méthode onInput pour stopper la
   * propagation de l'événement
   *
   * @access public
   * @memberof StopPropagationDirective
   * @since 1.0.0
   *
   * @param {Event} event - L'événement d'entrée
   *
   * @return {void} Ne retourne rien
   */
  @HostListener('input', ['$event'])
  public onInput(event: Event): void {
    event.stopPropagation();
  }
  //#endregion
}
