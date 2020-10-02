import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUggComponent } from './order-ugg.component';

describe('OrderUggComponent', () => {
  let component: OrderUggComponent;
  let fixture: ComponentFixture<OrderUggComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUggComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
