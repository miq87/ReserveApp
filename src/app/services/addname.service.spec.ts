import { TestBed } from '@angular/core/testing';

import { AddnameService } from './addname.service';

describe('AddnameService', () => {
  let service: AddnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
