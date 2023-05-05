import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../shared/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private rootUrl: string = 'api/item';

  constructor(private http: HttpClient) {}

  requestItems(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(this.rootUrl);
  }

  deleteItem(_id: string): Observable<{success: boolean}> {
    return this.http.delete<{success: boolean}>(`${this.rootUrl}/${_id}`);
  }
}
