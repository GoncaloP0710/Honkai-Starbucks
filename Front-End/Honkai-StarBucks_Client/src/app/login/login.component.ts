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
  loginMessage: string = '';
  loginMessageType: 'success' | 'error' = 'error'; // Set the message type based on login status
  
  constructor(private userService: UserService, private apiService: ApiService) {
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
      console.log("Trying to log in with username:", this.username, "and password:", this.password);

      if (data === "User loged in successfully") {
        console.log('Logged in successfully:', data);
        this.loginMessage = 'Logged in successfully';
        this.loginMessageType = 'success';
        this.wait();

      } else {
        if (data === "User does not exists") {
          console.log('User does not exists:', data);
          this.loginMessage = 'User does not exist. Registering...';
          this.register();

        } else if (data === "Password invalid") {
          console.log('Invalid password:', data);
          this.loginMessage = 'Invalid password';
          this.loginMessageType = 'error';

        } else {
          console.log('Unknown error:', data);
          this.loginMessage = 'Unknown error occurred';
          this.loginMessageType = 'error';
        }
      }
    });
  }

  register(): void { 
    this.apiService.getRegisterData(this.username, this.password).subscribe(data => {
      if (data === "User registered successfully") {
        console.log('User registered successfully:', data);
        this.loginMessage = 'User registered successfully';
        this.loginMessageType = 'success';
        this.wait();

      } else {
        console.log('Unknown error:', data);
        this.loginMessage = 'Unknown error occurred during registration';
        this.loginMessageType = 'error';
      }
    });
  }

  logout(): void {
    this.username = '';
    this.password = '';
    this.loginMessage = 'Logged out';
    console.log('Logged out');
  }

  wait(): void {
    // Delay the next action by 1 second
    setTimeout(() => {
      this.userService.setUsername(this.username);
      this.loginMessage = '';
    }, 1000);
  }
}