import { Component } from '@angular/core';
import { AuthLoginFormComponent } from '@features/auth/forms/auth-login-form/auth-login-form.component';

@Component({
  selector: 'app-auth-login',
  imports: [AuthLoginFormComponent],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
  host: { class: 'w-full' }
})
export class AuthLoginComponent {};
