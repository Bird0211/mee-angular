import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAllTableComponent } from './todo-all-table.component';

describe('TodoAllTableComponent', () => {
  let component: TodoAllTableComponent;
  let fixture: ComponentFixture<TodoAllTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoAllTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
