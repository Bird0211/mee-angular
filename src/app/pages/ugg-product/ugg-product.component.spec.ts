import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UggProductComponent } from './ugg-product.component';

describe('UggProductComponent', () => {
  let component: UggProductComponent;
  let fixture: ComponentFixture<UggProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UggProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UggProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
