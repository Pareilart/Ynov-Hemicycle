import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutHeaderComponent } from '@layouts/main-layout/partials/main-layout-header/main-layout-header.component';
import { MainLayoutContentComponent } from '@layouts/main-layout/partials/main-layout-content/main-layout-content.component';
import { MainLayoutFooterComponent } from '@layouts/main-layout/partials/main-layout-footer/main-layout-footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterModule,
    MainLayoutHeaderComponent,
    MainLayoutContentComponent,
    MainLayoutFooterComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
}
