import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-home',
  imports: [
    ButtonModule,
    RouterModule
  ],
  templateUrl: './auth-home.component.html',
  styleUrl: './auth-home.component.css'
})
export class AuthHomeComponent {}
