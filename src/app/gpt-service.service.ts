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
    return this.http.post<any>('https://72f4-49-249-20-122.ngrok-free.app/generate/syllabus', body);
  }


  getChapterContents(bookTopic: string, bookChapter:string,language: string): Observable<any> {
    const body = {
      bookTopic: bookTopic,
      bookChapter:bookChapter,
      language: language
    };
    return this.http.post<any>('https://72f4-49-249-20-122.ngrok-free.app/generate/chapter', body);
  }


}
