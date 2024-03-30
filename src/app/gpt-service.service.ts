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
    return this.http.post<any>('http://localhost:3000/generate/syllabus', body);
  }
}