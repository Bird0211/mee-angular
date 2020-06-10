import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlywaySettingComponent } from './flyway-setting.component';

describe('FlywaySettingComponent', () => {
  let component: FlywaySettingComponent;
  let fixture: ComponentFixture<FlywaySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlywaySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlywaySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
