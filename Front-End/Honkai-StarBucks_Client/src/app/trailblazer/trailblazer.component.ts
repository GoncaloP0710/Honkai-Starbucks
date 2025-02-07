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
    this.fetchTrailBlazersWithUsername(this.username);
  }

  addTrailBlazer(trailBlazer: TrailBlazer): void {
    this.trailLBlazers.set(trailBlazer.username, trailBlazer);
  }

  // Provide a uid of a player to fetch their trailblazers
  fetchTrailBlazers(id: string): void {
    console.log(`Fetching trailblazers for ${id} : ${this.username}`);
    this.trailblazerService.getTrailBlazers(Number(id), this.username).subscribe(
      trailBlazers => {
        console.log('Trailblazers fetched:', trailBlazers);
        trailBlazers.forEach(trailBlazer => this.addTrailBlazer(trailBlazer));
      },
      error => {
        console.error('Error fetching trailblazers:', error);
      }
    );
  }

  // Provide a username to get their fetched trailblazers from the server
  fetchTrailBlazersWithUsername(username: string): void {
    console.log(`Fetching trailblazers for ${username}`);
    this.trailblazerService.getTrailBlazersWithUsername(username).subscribe(
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