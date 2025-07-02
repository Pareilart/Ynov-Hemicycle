import { Component, input, InputSignal } from '@angular/core';
import { AuthEmailVerificationFormComponent } from "@features/auth/forms/auth-email-verification-form/auth-email-verification-form.component";

@Component({
  selector: 'app-auth-email-verification',
  imports: [AuthEmailVerificationFormComponent],
  templateUrl: './auth-email-verification.component.html',
  styleUrl: './auth-email-verification.component.css'
})
export class AuthEmailVerificationComponent {
  //#region Propriétés
  /**
   * Propriété email
   * @readonly
   *
   * @description
   * Signal de l'email
   *
   * @access public
   * @memberof AuthEmailVerificationComponent
   * @since 1.0.0
   *
   * @type {InputSignal<string>} email
   */
  public readonly email: InputSignal<string> =
    input.required<string>();
  //#endregion
}
