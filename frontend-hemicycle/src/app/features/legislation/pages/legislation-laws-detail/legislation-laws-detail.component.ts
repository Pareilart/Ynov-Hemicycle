import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { Law } from '@core/models/law/law.model';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-legislation-laws-detail',
  imports: [
    CommonModule,
    RouterModule, 
    ButtonModule,
    TabsModule,
    ProgressBarModule
  ],
  templateUrl: './legislation-laws-detail.component.html',
  styleUrl: './legislation-laws-detail.component.css'
})
export class LegislationLawsDetailComponent {
  //#region Propriétés
  public icons = [
    { src: 'images/emoji-pouce.svg', alt: 'D\'accord', value:'50' },
    { src: 'images/emoji-non.svg', alt: 'Doute', value:'30' },
    { src: 'images/emoji-fan.svg', alt: 'Trop cool', value:'20' },
    { src: 'images/emoji-check.svg', alt: 'Je valide', value:'70' },
    { src: 'images/emoji-croix.svg', alt: 'Pas d\'accord', value:'65' }
  ];
  /**
   * Propriété law
   * @readonly
   *
   * @description
   * Propriété law pour stocker
   * la loi
   *
   * @access public
   * @memberof LegislationLawsDetailComponent
   * @since 1.0.0
   *
   * @type {Law} law
   */
  public readonly law: InputSignal<Law> =
    input.required<Law>();
  //#endregion
}
