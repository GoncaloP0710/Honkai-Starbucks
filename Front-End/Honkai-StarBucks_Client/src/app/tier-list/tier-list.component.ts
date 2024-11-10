import { Component, OnInit } from '@angular/core';
import tierListData from '/home/goncalop0710/Desktop/Honkai-Starbucks/Front-End/Honkai-StarBucks_Client/src/app/tier-list/tier-list.json'; // Adjust path if needed

@Component({
  selector: 'app-tier-list',
  templateUrl: './tier-list.component.html',
  styleUrls: ['./tier-list.component.css']
})
export class TierListComponent implements OnInit {
  tierListData: any = tierListData;
  tiers: string[] = ['T0.5', 'T1', 'T1.5'];
  categories: string[] = ['Damage Dealer', 'Support', 'Sustain'];

  ngOnInit(): void {}

  getCharactersByTierAndCategory(tier: string, category: string): any[] {
    return this.tierListData[category].filter((item: any) => item.tier === tier);
  }
}