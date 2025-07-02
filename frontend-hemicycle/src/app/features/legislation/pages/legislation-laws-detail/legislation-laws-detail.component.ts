import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { Law } from '@core/models/law/law.model';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-legislation-laws-detail',
  imports: [
    CommonModule,
    RouterModule, 
    ButtonModule,
    TabsModule
  ],
  templateUrl: './legislation-laws-detail.component.html',
  styleUrl: './legislation-laws-detail.component.css'
})
export class LegislationLawsDetailComponent {
  //#region Propriétés
  public icons = [
    { src: 'images/emoji-pouce.svg', alt: 'Résumé' },
    { src: 'images/emoji-non.svg', alt: 'Paramètres' },
    { src: 'images/emoji-fan.svg', alt: 'Profil' },
    { src: 'images/emoji-check.svg', alt: 'Profil' },
    { src: 'images/emoji-croix.svg', alt: 'Profil' }
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
