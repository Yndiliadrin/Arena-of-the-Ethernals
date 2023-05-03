import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl: string = 'api/users';

  constructor(private http: HttpClient) {}

  regiszt(data: {username: string, password: string}) {
    return this.http.post<User>(this.rootUrl, data);
  }
}
