import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstcolComponent } from './firstcol.component';

describe('FirstcolComponent', () => {
  let component: FirstcolComponent;
  let fixture: ComponentFixture<FirstcolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstcolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstcolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
