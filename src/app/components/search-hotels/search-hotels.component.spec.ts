import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchHotelsComponent } from './search-hotels.component';

describe('FindHotelsComponent', () => {
  let component: SearchHotelsComponent;
  let fixture: ComponentFixture<SearchHotelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHotelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
