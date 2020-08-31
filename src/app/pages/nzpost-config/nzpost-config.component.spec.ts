import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzpostConfigComponent } from './nzpost-config.component';

describe('NzpostConfigComponent', () => {
  let component: NzpostConfigComponent;
  let fixture: ComponentFixture<NzpostConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzpostConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzpostConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
