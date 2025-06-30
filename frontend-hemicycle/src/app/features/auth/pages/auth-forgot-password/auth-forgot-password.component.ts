import { Component } from '@angular/core';
import { AuthForgotPasswordFormComponent } from '@features/auth/forms/auth-forgot-password-form/auth-forgot-password-form.component';

@Component({
  selector: 'app-auth-forgot-password',
  imports: [AuthForgotPasswordFormComponent],
  templateUrl: './auth-forgot-password.component.html',
  styleUrl: './auth-forgot-password.component.css',
  host: { class: 'w-full' }
})
export class AuthForgotPasswordComponent {};
