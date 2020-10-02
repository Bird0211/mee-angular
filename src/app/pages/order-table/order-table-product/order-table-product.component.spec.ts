import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTableProductComponent } from './order-table-product.component';

describe('OrderTableProductComponent', () => {
  let component: OrderTableProductComponent;
  let fixture: ComponentFixture<OrderTableProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTableProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTableProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
