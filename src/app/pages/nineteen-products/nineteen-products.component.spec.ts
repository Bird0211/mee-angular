import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NineteenProductsComponent } from './nineteen-products.component';

describe('NineteenProductsComponent', () => {
  let component: NineteenProductsComponent;
  let fixture: ComponentFixture<NineteenProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NineteenProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NineteenProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
