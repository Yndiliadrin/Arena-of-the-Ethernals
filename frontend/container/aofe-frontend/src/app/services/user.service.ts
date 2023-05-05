import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, Npc, User } from '../shared/types/user.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private rootUrl: string = 'api/users';

  constructor(private http: HttpClient) {}

  regiszt(data: { username: string; password: string }) {
    return this.http.post<User>(this.rootUrl, data);
  }

  updateCharacter(data: User): Observable<User> {
    return this.http.patch<User>(`${this.rootUrl}/${data._id}`, data, {
      withCredentials: true,
    });
  }

  getUserCharacters(): Observable<
    Array<{ username: string; character: Character; _id: string }>
  > {
    return this.http.get<
      Array<{ username: string; character: Character; _id: string }>
    >(this.rootUrl, { withCredentials: true });
  }

  getNpcCharacters(): Observable<Array<Npc>> {
    return this.http.get<Array<Npc>>('api/npc', { withCredentials: true });
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.rootUrl}/list`, {
      withCredentials: true,
    });
  }

  deleteUser(_id: string) {
    return this.http.delete(`${this.rootUrl}/${_id}`, {
      withCredentials: true,
    });
  }
}
