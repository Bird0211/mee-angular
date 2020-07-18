import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademeListComponent } from './trademe-list.component';

describe('TrademeListComponent', () => {
  let component: TrademeListComponent;
  let fixture: ComponentFixture<TrademeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrademeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
