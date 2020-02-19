import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceConfirmComponent } from './invoice-confirm.component';

describe('InvoiceConfirmComponent', () => {
  let component: InvoiceConfirmComponent;
  let fixture: ComponentFixture<InvoiceConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
