import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReservationItemComponent } from './my-reservation-item.component';

describe('MyReservationItemComponent', () => {
  let component: MyReservationItemComponent;
  let fixture: ComponentFixture<MyReservationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReservationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
