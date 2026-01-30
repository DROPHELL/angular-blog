import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  credentials = {
    login: '',
    password: ''
  };

  loginError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signIn(): void {
    this.loginError = false;

    this.authService.authenticate(this.credentials).subscribe({
      next: ok => {
        if (ok) {
          this.router.navigate(['/']);
        } else {
          this.loginError = true;
        }
      },
      error: () => {
        this.loginError = true;
      }
    });
  }
}
