import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  users: any = [];
  isLoading = true;
  isRefreshing = false;
  isAdding = false;
  isDeleting: string | null = null;
  delay = 0;
  error = '';
  
  newUser = {
    userId: '',
    name: '',
    password: '',
    role: 'General User'
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.error = '';
    this.userService.getAllUsers(this.delay).subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to load users';
        this.isLoading = false;
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  refreshUsers() {
    this.isRefreshing = true;
    this.loadUsers();
    setTimeout(() => {
      this.isRefreshing = false;
    }, 1000);
  }

  addUser() {
    this.isAdding = true;
    this.error = '';
    
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.isAdding = false;
        this.newUser = { userId: '', name: '', password: '', role: 'General User' };
        this.loadUsers();
      },
      error: (err) => {
        this.isAdding = false;
        this.error = err.error?.error || 'Failed to add user';
      }
    });
  }

  deleteUser(userId: string) {
    if (confirm(`Are you sure you want to delete user "${userId}"?`)) {
      this.isDeleting = userId;
      this.error = '';
      
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.isDeleting = null;
          this.loadUsers();
        },
        error: (err) => {
          this.isDeleting = null;
          this.error = err.error?.error || 'Failed to delete user';
        }
      });
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}