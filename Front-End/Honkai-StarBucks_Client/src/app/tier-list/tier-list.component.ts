import { Component, OnInit } from '@angular/core';
import tierListData from './tier-list.json'; // Import the JSON file

@Component({
  selector: 'app-tier-list',
  templateUrl: './tier-list.component.html',
  styleUrls: ['./tier-list.component.css']
})
export class TierListComponent implements OnInit {
  tiers = ["T0", "T1", "T2", "T3", "T4", "T5"];
  categories = ["Damage Dealer", "Support", "Sustain"];
  paths = ["Nihility", "Harmony", "Preservation", "Erudition", "Hunt", "Destruction", "Abundance", "Remembrance"]; 
  elements = ["Fire", "Imaginary", "Quantum", "Wind", "Lightning", "Ice", "Physical"];
  activePaths: string[] = [];
  activeElements: string[] = [];
  tierListData: { [key: string]: { File: string, type: string, tier: string, Path: string, Element: string }[] } = {};

  ngOnInit() {
    this.tierListData = tierListData; // Assign the imported JSON data to the component property
    console.log(this.tierListData);
  }

  togglePathFilter(path: string): void {
    if (this.activePaths.includes(path)) {
      this.activePaths = this.activePaths.filter(p => p !== path);
    } else {
      this.activePaths.push(path);
    }
  }

  toggleElementFilter(element: string): void {
    if (this.activeElements.includes(element)) {
      this.activeElements = this.activeElements.filter(e => e !== element);
    } else {
      this.activeElements.push(element);
    }
  }

  getFilteredCharactersByTierAndCategory(tier: string, category: string) {
    return this.getCharactersByTierAndCategory(tier, category).filter(item => 
      (this.activePaths.length === 0 || this.activePaths.includes(item.Path)) &&
      (this.activeElements.length === 0 || this.activeElements.includes(item.Element))
    );
  }

  getCharactersByTierAndCategory(tier: string, category: string) {
    return this.tierListData[category]?.filter(item => item.tier === tier) || [];
  }
}
