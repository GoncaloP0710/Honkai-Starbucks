import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private apiService: ApiService) {
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
    this.apiService.getLoginData(this.username, this.password).subscribe(data => {
      if (data.message === "User loged in successfully") {
        console.log('Logged in successfully:', data.message);
        this.userService.setUsername(this.username);
      } else {
        if (data.message === "User not found") {
          console.log('User not found:', data.message);
        } else if (data.message === "Invalid password") {
          console.log('Invalid password:', data.message);
        }
      }
    });
  }
}