import { Component, input, InputSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

export type Reaction = {
  label: string;
  icon: {
    active: string;
    inactive: string;
  };
  active: boolean;
  color: string;
  value: string | number;
  onClick?: (event: MouseEvent) => void;
}

@Component({
  selector: 'app-reaction-bar',
  imports: [
    TooltipModule,
    ButtonModule
  ],
  templateUrl: './reaction-bar.component.html',
  styleUrl: './reaction-bar.component.css'
})
export class ReactionBarComponent {
  //#region Propriétés
  /**
   * Propriété reactions
   * @readonly
   *
   * @description
   * Signale des réactions
   *
   * @access public
   * @memberof ReactionBarComponent
   * @since 1.0.0
   *
   * @type {InputSignal<Reaction[]>} reactions
   */
  public readonly reactions: InputSignal<Reaction[]> =
    input<Reaction[]>([]);
  //#endregion
}
