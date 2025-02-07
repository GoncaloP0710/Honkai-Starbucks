import { Component } from '@angular/core';
import { TrailBlazer } from '../trailblazer';
import { UserService } from '../user.service';
import { TrailblazerService } from '../trailblazer.service';

@Component({
  selector: 'app-trailblazer',
  templateUrl: './trailblazer.component.html',
  styleUrls: ['./trailblazer.component.css']
})
export class TrailblazerComponent {
  trailLBlazers: Map<string, TrailBlazer>;
  username: string = '';

  constructor(private userService: UserService, private trailblazerService: TrailblazerService) {
    this.trailLBlazers = new Map<string, TrailBlazer>();
    this.username = this.userService.getUsername();
  }

  addTrailBlazer(trailBlazer: TrailBlazer): void {
    this.trailLBlazers.set(trailBlazer.username, trailBlazer);
  }

  fetchTrailBlazers(id: string): void {
    console.log(`Fetching trailblazers for ${id}`);
    this.trailblazerService.getTrailBlazers(id, this.username).subscribe(
      trailBlazers => {
        console.log('Trailblazers fetched:', trailBlazers);
        trailBlazers.forEach(trailBlazer => this.addTrailBlazer(trailBlazer));
      },
      error => {
        console.error('Error fetching trailblazers:', error);
      }
    );
  }
}