import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html'
})
export class SignupComponent {

  credentials = {
    login: '',
    email: '',
    password: '',
    name: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  create(): void {
    this.credentials.login = this.credentials.email;

    this.authService.createOrUpdate(this.credentials).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {}
    });
  }
}
