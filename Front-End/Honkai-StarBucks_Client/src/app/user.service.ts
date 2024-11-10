import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string = '';

  constructor() {
    // Initialize username from local storage if available
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  setUsername(username: string): void {
    this.username = username;
    localStorage.setItem('username', username); // Store username in local storage
  }

  getUsername(): string {
    return this.username;
  }

  clearUsername(): void {
    this.username = '';
    localStorage.removeItem('username');
  }
}