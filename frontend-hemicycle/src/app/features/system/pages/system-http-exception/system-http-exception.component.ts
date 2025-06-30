import { Component, input, InputSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTPException } from '@features/system/models/http-exception/http-exception.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-system-http-exception',
  imports: [
    RouterModule,
    ButtonModule
  ],
  templateUrl: './system-http-exception.component.html',
  styleUrl: './system-http-exception.component.css'
})
export class SystemHttpExceptionComponent {
  //#region Propriétés
  /**
   * Propriété exception
   * @readonly
   *
   * @description
   * Exception à afficher
   *
   * @access public
   * @memberof SystemHttpExceptionComponent
   * @since 1.0.0
   *
   * @type {InputSignal<HTTPException>} exception
   */
  public readonly exception: InputSignal<HTTPException> =
    input.required<HTTPException>();
  //#endregion
}
