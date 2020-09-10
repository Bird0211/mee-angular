import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NineteenDeliveryComponent } from './nineteen-delivery.component';

describe('NineteenDeliveryComponent', () => {
  let component: NineteenDeliveryComponent;
  let fixture: ComponentFixture<NineteenDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NineteenDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NineteenDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
