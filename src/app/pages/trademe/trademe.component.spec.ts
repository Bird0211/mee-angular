import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademeComponent } from './trademe.component';

describe('TrademeComponent', () => {
  let component: TrademeComponent;
  let fixture: ComponentFixture<TrademeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrademeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
