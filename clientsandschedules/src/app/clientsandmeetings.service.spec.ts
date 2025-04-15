import { TestBed } from '@angular/core/testing';

import { ClientsAndMeetingsService } from './clientsandmeetings.service';

describe('ClientsandMeetingsService', () => {
  let service: ClientsAndMeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsAndMeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
