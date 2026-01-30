import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, map, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

interface JwtPayload {
  userId: string;
  login: string;
  email?: string;
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/user';
  private isBrowser: boolean;
  private jwtHelper = new JwtHelperService();

  currentUser: JwtPayload | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadUserFromToken();
  }

  private loadUserFromToken(): void {
    if (!this.isBrowser) return;

    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.currentUser = this.jwtHelper.decodeToken(token) as JwtPayload;
    } else {
      this.currentUser = null;
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  getUserId(): string | null {
    return this.currentUser?.userId ?? null;
  }

  authenticate(credentials: { login: string; password: string }): Observable<boolean> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth`, credentials)
      .pipe(
        map(res => {
          if (this.isBrowser && res?.token) {
            localStorage.setItem('token', res.token);
            this.currentUser = this.jwtHelper.decodeToken(res.token) as JwtPayload;
            return true;
          }
          return false;
        })
      );
  }

  createOrUpdate(data: {
    login: string;
    email: string;
    password: string;
    name: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  logout(): Observable<void> {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this.currentUser = null;
    return of(void 0);
  }
}
