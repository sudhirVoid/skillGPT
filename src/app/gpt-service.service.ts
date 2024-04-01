import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor(private http: HttpClient) { }

  generateSyllabus(bookTopic: string, language: string): Observable<any> {
    const body = {
      bookTopic: bookTopic,
      language: language
    };
    return this.http.post<any>('https://956e-2405-201-4032-142-c5fd-829d-4b89-33cf.ngrok-free.app/generate/syllabus', body);
  }


}
