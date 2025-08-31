import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userId = '';
  password = '';
  delay = 0;
  error = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.error = '';
    
    this.auth.login(this.userId, this.password, this.delay).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.error || 'Login failed. Please try again.';
      }
    });
  }
}
