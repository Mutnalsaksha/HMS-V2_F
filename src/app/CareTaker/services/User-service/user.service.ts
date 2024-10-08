import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://hms-v2-b.onrender.com';    // Replace with your API URL

  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/assigned`);
  }
}
