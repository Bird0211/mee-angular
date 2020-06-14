import { Component, OnInit } from '@angular/core';
import { TodoEvent } from 'src/app/interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less']
})
export class TodoListComponent implements OnInit {

  todoList: TodoEvent[];

  constructor() { }

  ngOnInit(): void {
  }

}
