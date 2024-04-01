import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private chaptersDataSubject = new BehaviorSubject<any>(null);

  constructor() { }

  setChaptersData(data: any) {
    this.chaptersDataSubject.next(data);
  }

  getChaptersData(): Observable<any> {
    return this.chaptersDataSubject.asObservable();
  }
  
}
