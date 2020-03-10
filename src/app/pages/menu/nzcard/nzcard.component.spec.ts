import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzcardComponent } from './nzcard.component';

describe('NzcardComponent', () => {
  let component: NzcardComponent;
  let fixture: ComponentFixture<NzcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
