import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Todo, YiYunUser } from 'src/app/interface';
import { TodoService } from 'src/app/service/todo.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-todo-all-table',
  templateUrl: './todo-all-table.component.html',
  styleUrls: ['./todo-all-table.component.less']
})
export class TodoAllTableComponent implements OnInit, OnChanges {

  @Input() data: Todo[];

  @Input() total: number;

  @Input() pageIndex: number | 1;

  @Input() pageSize: number | 20;

  @Output() pageIndexChange = new EventEmitter<number>();

  @Output() refreshData = new EventEmitter<void>();

  editId: number;

  selectedUser: number;

  yiyunUsers: YiYunUser[];

  constructor(private todoService: TodoService,
              private message: NzMessageService,
              private authService: AuthService,
              private userService: UserService,

    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      if (this.yiyunUsers) {
        this.data.forEach(item => item.userName = this.getUser(item.uid));
      }
    }
  }

  ngOnInit(): void {
    this.loadUser();
  }

  indexChange(value: number) {
    this.pageIndex = value;
    this.pageIndexChange.emit(value);
  }

  onItemChecked(todo: Todo, value: boolean) {
    this.todoService.setTodo(value, todo.id).then((result: boolean) => {
      if (result) {
        todo.status = value ? 1 : 0;
      } else {
        this.message.error('设置失败!');
      }
    });
  }

  save(value: Todo) {
    value.uid = !this.selectedUser || this.selectedUser === null ? this.authService.getUserId() : this.selectedUser;
    this.todoService.save(value).then((result: boolean) => {
      if (result) {
        this.editId = null;
        this.refreshData.emit();
      } else {
        this.message.error('更新失败!');
      }
    });
  }

  remove(id: number) {
    this.todoService.remove(id).then((result: boolean) => {
      if (result) {
        this.data = this.data.filter(item => item.id !== id);
      } else {
        this.message.error('删除失败!');
      }
    });
  }

  loadUser() {
    this.userService.loadUsers(this.authService.getBizId()).then((result: YiYunUser[]) => {
      this.yiyunUsers = result;
      if (this.data) {
        this.data.forEach(item => item.userName = this.getUser(item.uid));
      }
    });
  }

  getUser(uid: number): string {
    let username = null;
    if (this.yiyunUsers) {
      username = this.yiyunUsers.filter(item => item.userId === uid).map(item => item.givenName)[0];
    }
    return username;
  }
}
