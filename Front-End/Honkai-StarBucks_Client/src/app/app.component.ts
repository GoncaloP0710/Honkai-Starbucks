// app.component.ts
import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Honkai-StarBucks_Client';

  menuItems = [
    { label: 'About', icon: 'info' },
    { label: 'Services', icon: 'build' },
    { label: 'Contact', icon: 'contact_mail' },
    { label: 'Profile', icon: 'account_circle' },
  ];

  menuItemsPages = [
    { label: 'Home', icon: 'home' },
    { label: 'TrailBlazer', icon: 'directions_run' },  // or 'star'
    { label: 'Battle', icon: 'sports_mma' },  // or 'emoji_fight'
    { label: 'Tier-Lists', icon: 'list' },  // or 'checklist'
  ];
  
  onMenuClick(item: any) {
    console.log(`Clicked on ${item.label}`);
  }
}

