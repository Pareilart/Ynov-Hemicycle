import { Component } from '@angular/core';
import { AuthResetPasswordFormComponent } from '@features/auth/forms/auth-reset-password-form/auth-reset-password-form.component';

@Component({
  selector: 'app-auth-reset-password',
  imports: [AuthResetPasswordFormComponent],
  templateUrl: './auth-reset-password.component.html',
  styleUrl: './auth-reset-password.component.css',
  host: { class: 'w-full' }
})
export class AuthResetPasswordComponent {

}
