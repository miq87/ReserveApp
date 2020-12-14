import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbfirestoreComponent } from './dbfirestore.component';

describe('DbfirestoreComponent', () => {
  let component: DbfirestoreComponent;
  let fixture: ComponentFixture<DbfirestoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbfirestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbfirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
