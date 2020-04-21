import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeimobAuthComponent } from './weimob-auth.component';

describe('WeimobAuthComponent', () => {
  let component: WeimobAuthComponent;
  let fixture: ComponentFixture<WeimobAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeimobAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeimobAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
