import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {
  constructor(private http: HttpClient, private authService: AuthServiceService) {
  }
  private async initializeUserId(): Promise<string> {
    try {
      return await this.authService.getCurrentUserId();
    } catch (err) {
      // console.log('Cannot fetch userId:', err);
      return ''; // Return an empty string or handle the error appropriately
    }
  }
  private async generateHeader(): Promise<HttpHeaders> {
    const userId = await this.initializeUserId(); // Ensure userId is resolved
    return new HttpHeaders().set('X-User-Id', userId);
  }
  downloadPdf(payload: { bookId: number; userId: string }): Observable<Blob> {
    // Convert the Promise from generateHeader() to an Observable
    return from(this.generateHeader()).pipe(
      switchMap(headers => {
        const params = new HttpParams()
          .set('bookId', payload.bookId)
          .set('userId', payload.userId);
  
        // Return the HTTP request as an Observable with headers
        return this.http.get(`${environment.apiURL}generate/generatePdf`, {
          responseType: 'blob',
          params: params,
          headers: headers
        });
      })
    );
  }
}
