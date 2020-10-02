import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UggOrderComponent } from './ugg-order.component';

describe('UggOrderComponent', () => {
  let component: UggOrderComponent;
  let fixture: ComponentFixture<UggOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UggOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UggOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
