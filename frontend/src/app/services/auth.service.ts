import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(userId: string, password: string, delay: number = 0) {
    let params = new HttpParams();
    if (delay > 0) {
      params = params.set('delay', delay.toString());
    }
    return this.http.post<any>('/api/auth/login', { userId, password }, { params }).pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify({ ...res.user, token: res.token }));
      })
    );
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout() {
    localStorage.removeItem('user');
  }
}
