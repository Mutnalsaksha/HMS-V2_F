import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShService {
  private apiUrl = 'https://hms-v2-b.onrender.com/displaydata';

  constructor(private http: HttpClient) { }

  getDisplayData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
