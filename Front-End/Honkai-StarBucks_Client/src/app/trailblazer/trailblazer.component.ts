import { Component } from '@angular/core';
import { Teams, TrailBlazer } from '../trailblazer';
import { UserService } from '../user.service';
import { TrailblazerService } from '../trailblazer.service';

@Component({
  selector: 'app-trailblazer',
  templateUrl: './trailblazer.component.html',
  styleUrls: ['./trailblazer.component.css']
})
export class TrailblazerComponent {
  teams: Teams[] = [];
  trailLBlazers: Map<[string, string], TrailBlazer>;
  filteredTrailBlazers: TrailBlazer[] = [];
  username: string = '';
  searchTerm: string = '';
  selectedTrailBlazerId: string | null = null; // Add property to track selected Trailblazer
  viewMode: 'trailblazers' | 'teams' = 'trailblazers'; // Add view mode property

  constructor(private userService: UserService, private trailblazerService: TrailblazerService) {
    this.trailLBlazers = new Map<[string, string], TrailBlazer>();
    this.username = this.userService.getUsername();
    this.fetchTrailBlazersWithUsername(this.username);
    this.fetchTeams(this.username);
  }

  // ================== TrailBlazers ==================

  addTrailBlazer(trailBlazer: TrailBlazer): void {
    trailBlazer.showDetails = false; // Initialize showDetails property
    this.trailLBlazers.set([trailBlazer.username, trailBlazer._id], trailBlazer);
    this.filterTrailblazers();
  }

  removeTrailBlazer(_id: string, username: string): void {
    this.trailLBlazers.forEach((trailBlazer, key) => {
      if (trailBlazer._id === _id && trailBlazer.name === username) {
        this.trailblazerService.removeTrailBlazer(_id, this.username).subscribe(
          () => {
            console.log('Trailblazer removed:', trailBlazer);
            this.trailLBlazers.delete(key);
            this.filterTrailblazers();
          },
          error => {
            console.error('Error removing trailblazer:', error);
          }
        );
      }
    });
  }

  // Provide a uid of a player to fetch their trailblazers
  fetchTrailBlazers(id: string): void {
    console.log(`Fetching trailblazers for ${id} : ${this.username}`);
    this.trailblazerService.getTrailBlazers(Number(id), this.username).subscribe(
      trailBlazers => {
        console.log('Trailblazers fetched:', trailBlazers);
        trailBlazers.forEach(trailBlazer => {
          trailBlazer.showDetails = false; // Initialize showDetails property
          this.addTrailBlazer(trailBlazer);
        });
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
        trailBlazers.forEach(trailBlazer => {
          trailBlazer.showDetails = false; // Initialize showDetails property
          this.addTrailBlazer(trailBlazer);
        });
      },
      error => {
        console.error('Error fetching trailblazers:', error);
      }
    );
  }

  filterTrailblazers(): void {
    this.filteredTrailBlazers = Array.from(this.trailLBlazers.values()).filter(trailBlazer =>
      trailBlazer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Method to select a Trailblazer
  selectTrailBlazer(trailBlazerId: string): void {
    this.selectedTrailBlazerId = this.selectedTrailBlazerId === trailBlazerId ? null : trailBlazerId;
  }

  // ================== Teams ==================

  fetchTeams(username: string): void {
    console.log(`Fetching teams for ${username}`);
    this.trailblazerService.getTeams(username).subscribe(
      teams => {
        console.log('Teams fetched:', teams);
        this.teams = teams;
        this.teams.forEach(team => {
          team.trailBlazers.forEach(trailBlazer => {
            trailBlazer.showDetails = false; // Initialize showDetails property
          });
        });
        console.log('Teams assigned:', this.teams);
      },
      error => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  addTeam(teamName: string, trailBlazers: TrailBlazer[]): void {
    console.log(`Adding team with name: ${teamName}`);
    this.trailblazerService.addTeam(this.username, trailBlazers, teamName).subscribe(
      () => {
        console.log('Team added');
        this.fetchTeams(this.username);
      },
      error => {
        console.error('Error adding team:', error);
      }
    );
  }

  removeTeam(id: string): void {
    this.trailblazerService.removeTeam(id).subscribe(
      () => {
        console.log(`Team removed with ID: ${id}`);
        this.teams = this.teams.filter(team => team._id !== id);
      },
      error => {
        console.error('Error removing team:', error);
      }
    );
  }
}