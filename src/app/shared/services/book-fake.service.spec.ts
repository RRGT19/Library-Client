import { TestBed } from '@angular/core/testing';

import { BookFakeService } from './book-fake.service';

describe('BookFakeService', () => {
  let service: BookFakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookFakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
