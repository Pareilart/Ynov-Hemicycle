import { Component, input, InputSignal } from '@angular/core';
import { Auth2FAVerificationFormComponent } from "../../forms/auth-2fa-verification-form/auth-2fa-verification-form.component";

@Component({
  selector: 'app-auth-2fa-verification',
  imports: [Auth2FAVerificationFormComponent],
  templateUrl: './auth-2fa-verification.component.html',
  styleUrl: './auth-2fa-verification.component.css'
})
export class Auth2FAVerificationComponent {
  //#region Propriétés
  /**
   * Propriété email
   * @readonly
   *
   * @description
   * Signal de l'email
   *
   * @access public
   * @memberof Auth2FAVerificationComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string>} email
   */
  public readonly email: InputSignal<string> =
    input.required<string>();
  //#endregion
}
