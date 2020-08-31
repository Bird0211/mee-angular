import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademeAddButtonComponent } from './trademe-add-button.component';

describe('TrademeAddButtonComponent', () => {
  let component: TrademeAddButtonComponent;
  let fixture: ComponentFixture<TrademeAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrademeAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademeAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
