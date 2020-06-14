import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditerComponent } from './news-editer.component';

describe('NewsEditerComponent', () => {
  let component: NewsEditerComponent;
  let fixture: ComponentFixture<NewsEditerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsEditerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
