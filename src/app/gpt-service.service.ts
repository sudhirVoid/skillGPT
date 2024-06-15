import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { ChapterConfig } from './chapter-ui/chapter-ui.component';
import {BookConfig} from './chapter-ui/chapter-ui.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor(private http: HttpClient) { }

  generateSyllabus(bookTopic: string, language: string, userId: string): Observable<any> {
    const body = {
      bookTopic: bookTopic,
      language: language,
      userId: userId
    };
    return this.http.post<any>(`${environment.apiURL}generate/syllabus`, body);
  }


  getChapterContents(bookTopic: string, chapterConfig:ChapterConfig,language: string): Observable<any> {
    const body = {
      bookTopic: bookTopic,
      bookChapter:chapterConfig.chaptertitle,
      chapterId:chapterConfig.chapterid,
      bookLanguage: language
    };
    return this.http.post<any>(`${environment.apiURL}generate/chapter`, body);
  }

  async getUserBooks(userId: String): Promise<BookConfig[]> {
    let bookArray: BookConfig[] = [];

    try {
      const response = await firstValueFrom(this.http.post<any>(`${environment.apiURL}userData/getAllBooks`, { userId }));
      response.userData.forEach((book: any) => {
        bookArray.push({
          book_id: book.book_id,
          title: book.title
        });
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    }

    return bookArray;
  }

  async getOldBookData(bookId: number, userId: string){
    const response = await firstValueFrom(this.http.post<any>(`${environment.apiURL}userData/getOldBookData`, { bookId, userId }));
    console.log(`ALL MY DATA: `,response);
    return response;
  }

  async handleUserInput(input:any){
    const response = await firstValueFrom(this.http.post<any>(`${environment.apiURL}generate/chapterConversation`, input));
    return response;
  }
}
