import { Component } from '@angular/core';
import { LegislationLawCardComponent } from "@features/legislation/components/legislation-law-card/legislation-law-card.component";

@Component({
  selector: 'app-legislation-laws-feed',
  imports: [LegislationLawCardComponent],
  templateUrl: './legislation-laws-feed.component.html',
  styleUrl: './legislation-laws-feed.component.css'
})
export class LegislationLawsFeedComponent {

}
