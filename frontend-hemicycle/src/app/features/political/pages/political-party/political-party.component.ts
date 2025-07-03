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
    { name:"Rassemblement National", src: 'images/rn.png', alt: 'Logo parti Rassemblement National', nb:'123' },
    { name:"Ensemble pour la République", src: 'images/ensemble.png', alt: 'Logo parti Ensemble pour la République', nb:'93'},
    { name:"La France insoumise", src: 'images/france_insoumise.svg', alt: 'Logo parti La France insoumise', nb:'71'},
    { name:"Socialiste et apparentés", src: 'images/socialiste.png', alt: 'Logo parti Socialiste et apparentés', nb:'66'},
    { name:"Droite Républicaine", src: 'images/droite_republicaine.png', alt: 'Logo parti Droite Républicaine', nb:'49'},
    { name:"Ecologiste et Social", src: 'images/ecologiste_social.png', alt: 'Logo parti Ecologiste et social', nb:'38'},
    { name:"Les démocrates", src: 'images/democrates.png', alt: 'Logo parti Les démocrates', nb:'36'},
    { name:"Horizons et indépendants", src: 'images/horizons.png', alt: 'Logo parti Horizons et indépendants', nb:'34'},
    { name:"Libertés, indépendants, Outre-mer et Territoires", src: 'images/liot.png', alt: 'Logo parti Libertés, indépendants, Outre-mer et Territoires', nb:'23'},
    { name:"Gauche Démocrate et Républicaine", src: 'images/gdr.png', alt: 'Logo parti Gauche Démocrate et Républicaine', nb:'17'},
    { name:"UDR", src: 'images/udr.png', alt: 'Logo parti UDR', nb:'16'},
    { name:"Députés non inscrits", src: 'images/ni.png', alt: 'Logo parti Députés non inscrits', nb:'11'},
  ];
}
