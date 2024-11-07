import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  startTime: Date;
  uptime: string = '';

  constructor() {
    this.startTime = new Date();
  }

  ngOnInit(): void {
    this.updateUptime();
    setInterval(() => this.updateUptime(), 1000); // Update every second
  }

  updateUptime(): void {
    const now = new Date();
    const diff = now.getTime() - this.startTime.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    this.uptime = `${hours} hour${hours !== 1 ? 's' : ''}, ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}, ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  }
}