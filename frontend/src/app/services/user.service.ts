import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getProfile(delay: number = 0) {
    let params = new HttpParams();
    if (delay > 0) {
      params = params.set('delay', delay.toString());
    }
    return this.http.get<any>('/api/users/me', { params });
  }

  getAllUsers(delay: number = 0) {
    let params = new HttpParams();
    if (delay > 0) {
      params = params.set('delay', delay.toString());
    }
    return this.http.get<any[]>('/api/users', { params });
  }

  createUser(userData: any) {
    return this.http.post<any>('/api/users', userData);
  }

  deleteUser(userId: string) {
    return this.http.delete<any>(`/api/users/${userId}`);
  }
}
