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
  showModal: boolean = false; // Add property to control modal visibility
  selectedTrailBlazers: TrailBlazer[] = []; // Add property to store selected trailblazers for the team
  newTeamName: string = ''; // Add property to store the new team name

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

  addTeam(): void {
    if (this.selectedTrailBlazers.length < 1 || this.selectedTrailBlazers.length > 4) {
      console.error('You must select between 1 and 4 trailblazers.');
      return;
    }

    console.log(`Adding team with name: ${this.newTeamName}`);
    this.trailblazerService.addTeam(this.username, this.selectedTrailBlazers, this.newTeamName).subscribe(
      () => {
        console.log('Team added');
        this.fetchTeams(this.username);
        this.showModal = false; // Close the modal
        this.selectedTrailBlazers = []; // Reset selected trailblazers
        this.newTeamName = ''; // Reset team name
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

  // Method to toggle the modal visibility
  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  // Method to select or deselect a trailblazer for the new team
  toggleTrailBlazerSelection(trailBlazer: TrailBlazer): void {
    const index = this.selectedTrailBlazers.findIndex(tb => tb._id === trailBlazer._id);
    if (index > -1) {
      this.selectedTrailBlazers.splice(index, 1);
    } else if (this.selectedTrailBlazers.length < 4) {
      this.selectedTrailBlazers.push(trailBlazer);
    }
  }
}