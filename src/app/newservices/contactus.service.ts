// src/app/contactus.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private serverUrl = `${environment.apiUrl}/addbookservice/submit`; // Replace with your server API endpoint
  private formSubmitted: boolean = false;

  constructor(private http: HttpClient) {}

  submitForm(): Observable<any> {
    this.formSubmitted = true;

    setTimeout(() => {
      this.formSubmitted = false;
    }, 2000);

    return of({ success: true });
  }

  getFormStatus(): boolean {
    return this.formSubmitted;
  }

  submitContactForm(formData: any): Observable<any> {
    // return this.http.post<any>(this.serverUrl, formData);
    return this.http.post(this.serverUrl, formData)
    .pipe(
      tap((response: any) => {
        //console.log('Response from Server:', response);
      }),
      catchError((error: any) => {
        //console.error('Error from Server:', error);
        throw error;
      })
    );
  }
}
