import { Component, input, InputSignal, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Law } from '@core/models/law/law.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legislation-law-card',
  imports: [
    ButtonModule,
    CommonModule
  ],
  templateUrl: './legislation-law-card.component.html',
  styleUrl: './legislation-law-card.component.css'
})
export class LegislationLawCardComponent {
  //#region Propriétés
  /**
   * Propriété law
   * @readonly
   *
   * @description
   * Représente la loi
   *
   * @access public
   * @memberof LegislationLawCardComponent
   * @since 1.0.0
   *
   * @type {InputSignal<Law>} law
   */
  public readonly law: InputSignal<Law> =
    input.required<Law>();
  //#endregion
}
