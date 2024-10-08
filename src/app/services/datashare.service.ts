// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatashareService {
  private localStorageKey = 'sharedData';
  private dataSource: BehaviorSubject<any> = new BehaviorSubject<any>(this.getInitialData());

  currentData: Observable<any> = this.dataSource.asObservable();

  constructor() {}

  // Method to retrieve initial data from localStorage
  private getInitialData(): any {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log('Retrieved data from localStorage:', parsedData);
        return parsedData;
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return null;
      }
    }
    console.log('No data found in localStorage.');
    return null;
  }

  // Method to update data in BehaviorSubject and localStorage
  updateData(data: any): void {
    this.dataSource.next(data);
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(data));
      console.log('Data updated and saved to localStorage:', data);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Method to clear data
  clearData(): void {
    this.dataSource.next(null);
    localStorage.removeItem(this.localStorageKey);
    console.log('Data cleared from service and localStorage');
  }
}
