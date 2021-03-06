import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotelGeneratorComponent } from './hotel-generator.component';

describe('HotelGeneratorComponent', () => {
  let component: HotelGeneratorComponent;
  let fixture: ComponentFixture<HotelGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
