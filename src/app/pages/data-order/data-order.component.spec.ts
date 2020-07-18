import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOrderComponent } from './data-order.component';

describe('DataOrderComponent', () => {
  let component: DataOrderComponent;
  let fixture: ComponentFixture<DataOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
