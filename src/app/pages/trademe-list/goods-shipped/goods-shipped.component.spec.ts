import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsShippedComponent } from './goods-shipped.component';

describe('GoodsShippedComponent', () => {
  let component: GoodsShippedComponent;
  let fixture: ComponentFixture<GoodsShippedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsShippedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
