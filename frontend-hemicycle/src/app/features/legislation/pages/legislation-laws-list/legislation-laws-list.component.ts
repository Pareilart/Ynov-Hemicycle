import { Component, signal, Signal } from '@angular/core';
import { Law } from '@core/models/law/law.model';
import { LegislationLawCardComponent } from "@features/legislation/components/legislation-law-card/legislation-law-card.component";
import { LazyLoadEvent } from 'primeng/api';
import { ScrollerModule } from 'primeng/scroller';

@Component({
  selector: 'app-legislation-laws-list',
  imports: [
    LegislationLawCardComponent,
    ScrollerModule
  ],
  templateUrl: './legislation-laws-list.component.html',
  styleUrl: './legislation-laws-list.component.css'
})
export class LegislationLawsListComponent {
  //#region Propriétés
  /**
   * Propriété laws
   * @readonly
   *
   * @description
   * Représente la liste des lois
   *
   * @access public
   * @memberof LegislationLawsListComponent
   * @since 1.0.0
   *
   * @type {Signal<Law[]>} laws
   */
  public readonly laws: Signal<Law[]> = signal<Law[]>([
    ...Array.from({ length: 100 }, (_, index) => ({
      id: `${index + 5}eac456`,
      title: `Loi sur la protection des animaux ${index + 5}`,
      resume: `Loi sur la protection des animaux ${index + 5}`,
      content: `Loi sur la protection des animaux ${index + 5}`,
      adopted: false,
      accountability: 1 as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  ]);
  //#endregion

  //#region Méthodes
  /**
   * Méthode onLazyLoad
   * @param event
   *
   * @description
   * Gestionnaire d'événement pour le chargement lazy
   *
   * @access public
   * @memberof LegislationLawsListComponent
   * @since 1.0.0
   *
   * @param {LazyLoadEvent} event
   */
  public onLazyLoad(event: LazyLoadEvent): void {
    console.log(event);
  }
  //#endregion
}
