import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenutreeComponent } from './menutree.component';

describe('MenutreeComponent', () => {
  let component: MenutreeComponent;
  let fixture: ComponentFixture<MenutreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenutreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenutreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
