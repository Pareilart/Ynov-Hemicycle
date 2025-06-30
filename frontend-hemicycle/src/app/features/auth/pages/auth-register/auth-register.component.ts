import { Component } from '@angular/core';
import { AuthRegisterFormComponent } from '@features/auth/forms/auth-register-form/auth-register-form.component';

@Component({
  selector: 'app-auth-register',
  imports: [AuthRegisterFormComponent],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.css',
  host: { class: 'w-full' }
})
export class AuthRegisterComponent {};
