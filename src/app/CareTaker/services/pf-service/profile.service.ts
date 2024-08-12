import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

class Ticket {
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://hms-v2-b.onrender.com/api/profile';

  constructor(private http: HttpClient) {
  }

  getProfile(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?email=${email}`);
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, profileData);
  }

  getCurrentUserProfile(email: string): Observable<any> {
    // const currentUserEmail = localStorage.getItem('currentUserEmail'); // Assuming email is stored in localStorage
    return this.http.get<any>(`${this.apiUrl}?email=${email}`);
  }
}
