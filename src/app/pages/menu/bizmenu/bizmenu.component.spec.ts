import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizmenuComponent } from './bizmenu.component';

describe('BizmenuComponent', () => {
  let component: BizmenuComponent;
  let fixture: ComponentFixture<BizmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
