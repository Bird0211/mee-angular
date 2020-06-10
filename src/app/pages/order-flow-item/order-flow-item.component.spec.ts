import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFlowItemComponent } from './order-flow-item.component';

describe('OrderFlowItemComponent', () => {
  let component: OrderFlowItemComponent;
  let fixture: ComponentFixture<OrderFlowItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFlowItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFlowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
