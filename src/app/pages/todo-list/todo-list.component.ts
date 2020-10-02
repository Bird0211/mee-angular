import { Component, OnInit } from '@angular/core';
import { Todo, YiYunUser } from 'src/app/interface';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/service/user.service';
import { TodoService } from 'src/app/service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less']
})
export class TodoListComponent implements OnInit {

  todoList: Todo[];

  editId: number;

  title: string;
  selectedUser: number;

  yiyunUsers: YiYunUser[] = [];

  current = 1;

  totalNum: number;

  pageSize = 6;

  constructor(private authService: AuthService,
              private router: Router,
              private message: NzMessageService,
              private userService: UserService,
              private todoService: TodoService
    ) {
      todoService.getTodoNum.subscribe(result => this.totalNum = result);
  }

  ngOnInit(): void {
    this.loadMyTodo(1);
    this.loadUser();
    this.selectedUser = this.authService.getUserId();
  }

  loadMyTodo(pageNo: number) {
    this.todoService.loadMyTodo(pageNo, this.pageSize).then((result: Todo[]) => {
      this.todoList = result;
    });
  }

  finish(value: boolean, todo: Todo) {
    this.todoService.setTodo(value, todo.id).then((result: boolean) => {
      if (result) {
        todo.status = value ? 1 : 0;
      } else {
        this.message.error('设置失败!');
      }
    });
  }

  remove(id: number) {
    this.todoService.remove(id).then((result: boolean) => {
      if (result) {
        this.todoList = this.todoList.filter(item => item.id !== id);
      } else {
        this.message.error('删除失败!');
      }
    });
  }

  add() {
    const uid = !this.selectedUser || this.selectedUser === null ? this.authService.getUserId() : this.selectedUser;
    this.todoService.add(this.title, uid).then((result: boolean) => {
      if (result) {
        this.title = null;
        this.loadMyTodo(this.current);
      } else {
        this.message.error('更新失败!');
      }
    });
  }

  save(value: Todo) {
    value.uid = !this.selectedUser || this.selectedUser === null ? this.authService.getUserId() : this.selectedUser;
    this.todoService.save(value).then((result: boolean) => {
      if (result) {
        this.editId = null;
        this.loadMyTodo(this.current);
      } else {
        this.message.error('更新失败!');
      }
    });
  }

  loadUser() {
    this.userService.loadUsers(this.authService.getBizId()).then((result: YiYunUser[]) => {
      this.yiyunUsers = result;
    });
  }

  more() {
    this.router.navigate(['todo/all'], {skipLocationChange: true});
  }
}
