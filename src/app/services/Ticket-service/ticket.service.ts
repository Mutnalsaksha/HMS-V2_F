import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:3000/'; // Your backend URL

  constructor(private http: HttpClient) {}

  getTicketDetails(requestId: string): Observable<any> {
    console.log(`Fetching details for requestId: ${requestId}`); // Log requestId
    return this.http.get(`${this.baseUrl}request/${requestId}`);
  }

  updateTicketDetails(requestId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}request/${requestId}`, data);
  }


}
