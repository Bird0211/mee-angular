import { Component, OnInit } from '@angular/core';
import { Todo, YiYunUser } from 'src/app/interface';
import { TodoService } from 'src/app/service/todo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/service/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-todo-all',
  templateUrl: './todo-all.component.html',
  styleUrls: ['./todo-all.component.less']
})
export class TodoAllComponent implements OnInit {

  mytodo: Todo[];
  mytodoTotal: number;
  mytodoPageIndex = 1;
  mytodoPageSize = 20;
  mytodoUnsetNum: number;

  createdtodo: Todo[];
  createdTotal: number;
  createdPageIndex = 1;
  createdPageSize = 20;
  createdUnsetNum: number;
  isVisible = false;

  validateForm!: FormGroup;

  yiyunUsers: YiYunUser[] = [];

  constructor(private todoService: TodoService,
              private authService: AuthService,
              private fb: FormBuilder,
              private userService: UserService,
              private message: NzMessageService
    ) {
    todoService.getMyAllTodoNum.subscribe((result: number) => this.mytodoTotal = result);
    todoService.getCreatedTodoNum.subscribe((result: number) => this.createdTotal = result);
    todoService.getTodoNum.subscribe((result: number) => this.mytodoUnsetNum = result);
    todoService.createdTodoNum.subscribe((result: number) => this.createdUnsetNum = result);
  }

  ngOnInit(): void {
    this.loadMyTodo();
    this.loadCreateTodo();
    this.loadUser();
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      user: [this.authService.getUserId(), [Validators.required]],
    });
  }

  mytodoIndexChange(value: number) {
    this.mytodoPageIndex = value;
    this.loadMyTodo();
  }

  createdIndexChange(value: number) {
    this.createdPageIndex = value;
    this.loadCreateTodo();
  }

  loadMyTodo() {
    this.todoService.loadMyAllTodo(this.mytodoPageIndex, this.mytodoPageSize).then((result: Todo[]) => {
      this.mytodo = result;
    });
    this.todoService.loadTodoNumber();
  }

  loadCreateTodo() {
    this.todoService.loadMyCreatedTodo(this.mytodoPageIndex, this.mytodoPageSize).then((result: Todo[]) => {
      this.createdtodo = result;
    });
    this.todoService.loadCreateNumber();
  }

  changeTab(value: number) {
    if (value === 0) {
      this.loadMyTodo();
    } else if (value === 1) {
      this.loadCreateTodo();
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    const uid = this.validateForm.value.user;
    const title = this.validateForm.value.title;
    this.todoService.add(title, uid).then((result: boolean) => {
      if (result) {
        this.loadMyTodo();
        this.loadCreateTodo();
      } else {
        this.message.error('更新失败!');
      }
    });
    this.isVisible = false;
  }

  loadUser() {
    this.userService.loadUsers(this.authService.getBizId()).then((result: YiYunUser[]) => {
      console.log(result);
      this.yiyunUsers = result;
    });
  }
}
