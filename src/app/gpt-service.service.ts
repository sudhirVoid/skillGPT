import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first, firstValueFrom, from, switchMap } from 'rxjs';
import { ChapterConfig } from './chapter-ui/chapter-ui.component';
import {BookConfig} from './chapter-ui/chapter-ui.component';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {
  constructor(private http: HttpClient, private authService: AuthServiceService) {
    // Initialize the userId Promise
  }

  // Method to fetch userId asynchronously and store it in a Promise
  private async initializeUserId(): Promise<string> {
    try {
      return await this.authService.getCurrentUserId();
    } catch (err) {
      // console.log('Cannot fetch userId:', err);
      return ''; // Return an empty string or handle the error appropriately
    }
  }

  // Helper function to generate headers with 'X-User-Id'
  private async generateHeader(): Promise<HttpHeaders> {
    const userId = await this.initializeUserId(); // Ensure userId is resolved
    return new HttpHeaders().set('X-User-Id', userId);
  }
  generateSyllabus(bookTopic: string, language: string, userId: string): Observable<any> {
    // Convert the Promise from generateHeader() to an Observable
    return from(this.generateHeader()).pipe(
      switchMap(headers => {
        const body = {
          bookTopic: bookTopic,
          language: language,
          userId: userId
        };
        // Return the HTTP request as an Observable
        return this.http.post<any>(`${environment.apiURL}generate/syllabus`, body, { headers });
      })
    );
  }


getChapterContents(bookTopic: string, chapterConfig: ChapterConfig, language: string): Observable<any> {
  // Convert the Promise from generateHeader() to an Observable
  return from(this.generateHeader()).pipe(
    switchMap(headers => {
      const body = {
        bookTopic: bookTopic,
        bookChapter: chapterConfig.chaptertitle,
        chapterId: chapterConfig.chapterid,
        bookLanguage: language
      };
      // Return the HTTP request as an Observable
      return this.http.post<any>(`${environment.apiURL}generate/chapter`, body, { headers });
    })
  );
}


  async getUserBooks(userId: String): Promise<BookConfig[]> {
    const headers = await this.generateHeader();
    const httpOptions = {
      headers: headers
    };
    let bookArray: BookConfig[] = [];

    try {
      const response = await firstValueFrom(this.http.post<any>(`${environment.apiURL}userData/getAllBooks`, { userId },httpOptions));
      response.userData.forEach((book: any) => {
        bookArray.push({
          book_id: book.book_id,
          title: book.title,
          percentOfBookRead: book.percentread
        });
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    }

    return bookArray;
  }

  async getOldBookData(bookId: number, userId: string){
    const headers = await this.generateHeader();
    const response = await firstValueFrom(this.http.post<any>(`${environment.apiURL}userData/getOldBookData`, { bookId, userId },{headers}));
    // // console.log(`ALL MY DATA: `,response);
    return response;
  }

  async handleUserInput(input:any){
    const headers = await this.generateHeader();
    const response = await firstValueFrom(this.http.post<any>(`${environment.apiURL}generate/chapterConversation`, input,{headers}));
    return response;
  }

  async setChapterCompletionStatus(chapterConfig:ChapterConfig){
    const headers = await this.generateHeader();
    return this.http.post<any>(`${environment.apiURL}update/isChapterCompleted`, chapterConfig,{headers}).subscribe(data=>{
      return data;
    })
  }
}
