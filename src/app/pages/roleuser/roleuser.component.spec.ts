import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleuserComponent } from './roleuser.component';

describe('RoleuserComponent', () => {
  let component: RoleuserComponent;
  let fixture: ComponentFixture<RoleuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
