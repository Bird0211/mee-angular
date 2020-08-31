import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeimobDeliveryComponent } from './weimob-delivery.component';

describe('WeimobDeliveryComponent', () => {
  let component: WeimobDeliveryComponent;
  let fixture: ComponentFixture<WeimobDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeimobDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeimobDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
