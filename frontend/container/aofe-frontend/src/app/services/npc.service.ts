import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Npc } from '../shared/types/user.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NpcService {
  private rootUrl: string = 'api/npc';

  constructor(private http: HttpClient) {}

  createNpc(data: Npc): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.rootUrl, data);
  }

  readNpcs(): Observable<Array<Npc>> {
    return this.http.get<Array<Npc>>(this.rootUrl, { withCredentials: true });
  }

  updateNpc(data: Npc): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(this.rootUrl, data);
  }

  deleteNpc(_id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.rootUrl}/${_id}`);
  }
}
