import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private readonly rootUrl: string = "api/";

  constructor(private http: HttpClient) {}

  public getServerStatus() {
    this.http.get(`${this.rootUrl}status`).subscribe(console.log);
  }
}
