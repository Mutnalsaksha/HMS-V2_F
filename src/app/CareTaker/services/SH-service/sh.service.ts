import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShService {
  private apiUrl = 'http://localhost:3000/displaydata';

  constructor(private http: HttpClient) { }

  getDisplayData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
