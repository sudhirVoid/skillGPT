import { TestBed } from '@angular/core/testing';

import { FirebaseRealtimeDBService } from './firebase-realtime-db.service';

describe('FirebaseRealtimeDBService', () => {
  let service: FirebaseRealtimeDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseRealtimeDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
