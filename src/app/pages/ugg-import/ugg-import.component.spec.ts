import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UggImportComponent } from './ugg-import.component';

describe('UggImportComponent', () => {
  let component: UggImportComponent;
  let fixture: ComponentFixture<UggImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UggImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UggImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
