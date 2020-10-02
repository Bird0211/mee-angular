import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UggSettingComponent } from './ugg-setting.component';

describe('UggSettingComponent', () => {
  let component: UggSettingComponent;
  let fixture: ComponentFixture<UggSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UggSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UggSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
