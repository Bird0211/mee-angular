import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceResultComponent } from './invoice-result.component';

describe('InvoiceResultComponent', () => {
  let component: InvoiceResultComponent;
  let fixture: ComponentFixture<InvoiceResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
