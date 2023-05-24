import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, tap } from 'rxjs';
import { IUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  private url: string = 'https://flowerShop-v2n3.onrender.com';
  helper = new JwtHelperService();
  constructor(private http: HttpClient) {}
  register(user: IUser): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.url}/auth/register`, user)
      .pipe(
        tap((user) => {
          localStorage.setItem('token', user.token);
        })
      );
  }
  login(user: IUser): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.url}/auth/login`, user)
      .pipe(
        tap((user) => {
          localStorage.setItem('token', user.token);
        })
      );
  }
  logout() {
    localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getMe(): any {
    return this.http.get(`${this.url}/auth/me`).pipe(
      tap((user) => {
        this.user = user;
      })
    );
  }
  isAuth(): boolean {
    const token = localStorage.getItem('token');
    try {
      return !this.helper.isTokenExpired(token);
    } catch (error) {
      localStorage.setItem('token', '');
      return false
    }
  }
}
