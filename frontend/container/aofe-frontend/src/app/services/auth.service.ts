import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl: string = 'api/users';

  constructor(private http: HttpClient) {}

  login(loginData: { username: string; password: string }) {
    return this.http.post<User>(`${this.rootUrl}/login`, loginData);
  }

  logout() {
    return this.http.post(
      `${this.rootUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
