import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-political-party',
  imports: [
    CommonModule,
    RouterModule, 
    ButtonModule,
    TabsModule,
    ProgressBarModule
  ],
  templateUrl: './political-party.component.html',
  styleUrl: './political-party.component.css'
})
export class PoliticalPartyComponent {
  public partis = [
    { name:"Rassemblement National", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social' },
    { name:"Ensemble pour la République", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"La France insoumise", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"Socialiste et apparentés", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"Droite Républicaine", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"Ecologiste et Social", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"Les démocrates", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"Horizons et indépendants", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"Libertés, indépendants, Outre-mer et Territoires", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"Gauche Démocrate et Républicaine", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"UDR", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
    { name:"Députés non inscrits", src: 'images/ecolo.jpg', alt: 'Logo parti Ecologiste et social'},
  ];
}
