import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeimobOrderComponent } from './weimob-order.component';

describe('WeimobOrderComponent', () => {
  let component: WeimobOrderComponent;
  let fixture: ComponentFixture<WeimobOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeimobOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeimobOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
