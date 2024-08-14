import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor(private http: HttpClient) { }

  downloadPdf(payload: { bookId: number; userId: string }): Observable<Blob> {
    const params = new HttpParams()
      .set('bookId', payload.bookId)
      .set('userId', payload.userId);
  
    return this.http.get(`${environment.apiURL}generate/generatePdf`, {
      responseType: 'blob',
      params: params
    });
  }
}
