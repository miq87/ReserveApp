import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotelItemComponent } from './hotel-item.component';

describe('HotelItemComponent', () => {
  let component: HotelItemComponent;
  let fixture: ComponentFixture<HotelItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
