import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'https://hms-v2-b.onrender.com'; // Your backend URL

  constructor(private http: HttpClient) {}

  getTicketDetails(requestId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/request/${requestId}`);
  }

  updateTicketDetails(requestId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/request/${requestId}`, data);
  }
}