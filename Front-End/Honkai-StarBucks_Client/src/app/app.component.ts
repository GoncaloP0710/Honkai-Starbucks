import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    console.log('App component loaded');
  }

  title = 'Honkai-StarBucks_Client';

  menuItems = [
    { label: 'About', icon: 'info' },
    { label: 'Services', icon: 'build' },
    { label: 'Contact', icon: 'contact_mail' },
    { label: 'Profile', icon: 'account_circle', route: '/login' },
  ];

  menuItemsPages = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'TrailBlazer', icon: 'directions_run', route: '/trailblazer' },  // or 'star'
    { label: 'Battle', icon: 'sports_mma', route: '/battle' },  // or 'emoji_fight'
    { label: 'Tier-Lists', icon: 'list', route: '/tier-lists' },  // or 'checklist'
  ];
  
  onMenuClick(item: any) {
    console.log(`Clicked on ${item.label}`);
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}