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
  trailLBlazers: Map<string, TrailBlazer>;
  filteredTrailBlazers: TrailBlazer[] = [];
  username: string = '';
  searchTerm: string = '';
  selectedTrailBlazerId: string | null = null; // Add property to track selected Trailblazer
  viewMode: 'trailblazers' | 'teams' = 'trailblazers'; // Add view mode property
  showModal: boolean = false; // Add property to control modal visibility
  selectedTrailBlazers: TrailBlazer[] = []; // Add property to store selected trailblazers for the team
  newTeamName: string = ''; // Add property to store the new team name

  uniqueUsernames: string[] = []; // Store unique usernames for the dropdown
  selectedUsername: string = ''; // Store the currently selected username

  constructor(private userService: UserService, private trailblazerService: TrailblazerService) {
    this.trailLBlazers = new Map<string, TrailBlazer>();
    this.username = this.userService.getUsername();
    this.fetchTrailBlazersWithUsername(this.username);
    this.fetchTeams(this.username);
  }

  // ================== TrailBlazers ==================

  addTrailBlazer(trailBlazer: TrailBlazer): void {
    // Construct a unique string key using the username and _id
    const key = `${trailBlazer._id}`;
  
    // Check if the TrailBlazer already exists in the map
    if (this.trailLBlazers.has(key)) {
      console.log(`TrailBlazer with ID ${trailBlazer._id} and username ${trailBlazer.username} already exists.`);
      return; // Exit if the TrailBlazer already exists
    }
  
    // If not already in the list, add it
    trailBlazer.showDetails = false; // Initialize showDetails property
    this.trailLBlazers.set(key, trailBlazer); // Add to the Map
    this.filterTrailblazers();
    console.log(`TrailBlazer with ID ${trailBlazer._id} added.`);
  }

  removeTrailBlazer(_id: string, username: string): void {
    const key = `${_id}`; // Construct the string key
    if (this.trailLBlazers.has(key)) {
      this.trailblazerService.removeTrailBlazer(_id, this.username).subscribe(
        () => {
          console.log(`Trailblazer removed: ${key}`);
          this.trailLBlazers.delete(key); // Remove from the Map
          this.filterTrailblazers();
        },
        error => {
          console.error('Error removing trailblazer:', error);
        }
      );
    } else {
      console.log(`TrailBlazer with key ${key} not found.`);
    }
  }

  // Provide a uid of a player to fetch their trailblazers
  fetchTrailBlazers(id: string): void {
    console.log(`Fetching trailblazers for ${id} : ${this.username}`);
    this.trailblazerService.getTrailBlazers(Number(id), this.username).subscribe(
      trailBlazers => {
        console.log('Trailblazers fetched:', trailBlazers);
        trailBlazers.forEach(trailBlazer => {
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
          this.addTrailBlazer(trailBlazer);
        });
      },
      error => {
        console.error('Error fetching trailblazers:', error);
      }
    );
  }

  filterTrailblazers(): void {
    // Populate unique usernames
    this.uniqueUsernames = Array.from(
      new Set(
      Array.from(this.trailLBlazers.values()).map((trailBlazer: TrailBlazer) => trailBlazer.username)
      )
    );
  
    // Filter trailblazers based on the search term and selected username
    this.filteredTrailBlazers = Array.from(this.trailLBlazers.values()).filter(trailBlazer =>
      trailBlazer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedUsername === '' || trailBlazer.username === this.selectedUsername)
    );
  }

  filterTrailblazersByUsername(): void {
    this.filteredTrailBlazers = Array.from(this.trailLBlazers.values()).filter(trailBlazer =>
      (this.selectedUsername === '' || trailBlazer.username === this.selectedUsername) &&
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
      // If already selected, remove it
      this.selectedTrailBlazers.splice(index, 1);
    } else {
      // Otherwise, add it to the selected list
      this.selectedTrailBlazers.push(trailBlazer);
    }
  }

  setDetailsPosition(event: MouseEvent, trailBlazer: TrailBlazer): void {
    const element = event.target as HTMLElement;
    const rect = element.getBoundingClientRect();
    const spacing = 10;
  
    // Temporarily assign a default position to trigger rendering
    trailBlazer.detailsTop = rect.top + window.scrollY;
    trailBlazer.detailsLeft = rect.right + spacing + window.scrollX;
    trailBlazer.showDetails = true;
  
    // Wait for the popup to be rendered
    setTimeout(() => {
      const popup = document.querySelector('.detailed-card') as HTMLElement;
      if (!popup) return;
  
      const popupRect = popup.getBoundingClientRect();
      const popupWidth = popupRect.width;
      const popupHeight = popupRect.height;
  
      // Start with desired positions
      let topPosition = rect.top + window.scrollY + (rect.height / 2) - (popupHeight / 2);
      let leftPosition = rect.right + spacing + window.scrollX;
  
      // Check right overflow
      if ((leftPosition + popupWidth) > window.innerWidth + window.scrollX + 100) {
        // Push the popup to the left if it overflows
        leftPosition = window.innerWidth - popupWidth - 500;
      }
  
      // Check top overflow
      if (topPosition < window.scrollY) {
        topPosition = window.scrollY + spacing;
      }
  
      // Check bottom overflow
      const bottomEdge = topPosition + popupHeight;
      const maxVisibleBottom = window.scrollY + window.innerHeight;
      if (bottomEdge > maxVisibleBottom) {
        topPosition = maxVisibleBottom - popupHeight - 100;
      }
  
      // Apply corrected positions
      trailBlazer.detailsTop = topPosition;
      trailBlazer.detailsLeft = leftPosition;
    }, 0);
  }
  
  
  
}