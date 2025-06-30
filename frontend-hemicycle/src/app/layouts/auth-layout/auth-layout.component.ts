import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayoutContentComponent } from '@layouts/auth-layout/partials/auth-layout-content/auth-layout-content.component';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterModule,
    AuthLayoutContentComponent
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {}
