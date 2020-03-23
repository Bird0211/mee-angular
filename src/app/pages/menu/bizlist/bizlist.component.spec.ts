import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizlistComponent } from './bizlist.component';

describe('BizlistComponent', () => {
  let component: BizlistComponent;
  let fixture: ComponentFixture<BizlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
