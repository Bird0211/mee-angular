import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizselectComponent } from './bizselect.component';

describe('BizselectComponent', () => {
  let component: BizselectComponent;
  let fixture: ComponentFixture<BizselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
