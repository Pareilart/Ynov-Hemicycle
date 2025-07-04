import { CommonModule } from '@angular/common';
import { Component, inject, input, InputSignal, Signal } from '@angular/core';
import { fetchAllLaws } from '@app/core/stores/law/law.actions';
import { selectAllLaws } from '@app/core/stores/law/law.selectors';
import { LawState } from '@app/core/stores/law/law.state';
import { Law } from '@core/models/law/law.model';
import { LegislationLawCardComponent } from "@features/legislation/components/legislation-law-card/legislation-law-card.component";
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { ScrollerModule } from 'primeng/scroller';

@Component({
  selector: 'app-legislation-laws-list',
  imports: [
    LegislationLawCardComponent,
    ScrollerModule,
    CommonModule
  ],
  templateUrl: './legislation-laws-list.component.html',
  styleUrl: './legislation-laws-list.component.css'
})
export class LegislationLawsListComponent {
  //#region Propriétés
  /**
   * Propriété store
   * @readonly
   *
   * @description
   * Représente le store de la liste des lois
   *
   * @access private
   * @memberof LegislationLawsListComponent
   * @since 1.0.0
   *
   * @type {Store<LawState>} store
   */
  private readonly store: Store<LawState> =
    inject<Store<LawState>>(Store<LawState>);

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
  public readonly laws: Signal<Law[]> =
    this.store.selectSignal(selectAllLaws);
  //#endregion

  //#region Méthodes
  /**
   * Méthode ngOnInit
   *
   * @description
   * Initialisation du composant
   *
   * @access public
   * @memberof LegislationLawsListComponent
   * @since 1.0.0
   */
  public ngOnInit(): void {
    this.store.dispatch(fetchAllLaws());
  }

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
