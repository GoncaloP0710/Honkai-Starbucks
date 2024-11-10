import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService) {
    this.userService.clearUsername();
    this.username = this.userService.getUsername();
    console.log(this.userService.getUsername());
  }

  setUsername(username: string): void {
    this.userService.setUsername(username);
    this.username = username;
  }

  getUsername(): string {
    return this.userService.getUsername();
  }

  login(): void {
    this.setUsername(this.username);
    console.log('Logged in with', this.username, this.password);
  }
}