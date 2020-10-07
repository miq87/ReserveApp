import { TestBed } from '@angular/core/testing';

import { AddNewHotelService } from './add-new-hotel.service';

describe('AddNewHotelService', () => {
  let service: AddNewHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
