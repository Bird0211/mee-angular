import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTodayComponent } from './data-today.component';

describe('DataTodayComponent', () => {
  let component: DataTodayComponent;
  let fixture: ComponentFixture<DataTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
