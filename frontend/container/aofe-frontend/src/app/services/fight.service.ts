import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fightReport } from '../shared/types/report.type';

@Injectable({
  providedIn: 'root',
})
export class FightService {
  private rootUrl = '/api/arena';

  constructor(private http: HttpClient) {}

  fight(data: {
    attacker: string;
    defender: string;
  }): Observable<Array<fightReport>> {
    return this.http.post<Array<fightReport>>(`${this.rootUrl}/fight`, data);
  }
}
