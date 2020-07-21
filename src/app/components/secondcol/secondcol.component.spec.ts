import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondcolComponent } from './secondcol.component';

describe('SecondcolComponent', () => {
  let component: SecondcolComponent;
  let fixture: ComponentFixture<SecondcolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondcolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondcolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
