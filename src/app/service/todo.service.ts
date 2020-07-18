import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo, MeeResult, TodoPageResult } from '../interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../pages/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  @Output() getTodoNum: EventEmitter<number> = new EventEmitter();

  @Output() createdTodoNum: EventEmitter<number> = new EventEmitter();

  @Output() getMyAllTodoNum: EventEmitter<number> = new EventEmitter();

  @Output() getCreatedTodoNum: EventEmitter<number> = new EventEmitter();

  myTodoUrl: string;
  addTodoUrl: string;
  saveTodoUrl: string;
  removeTodoUrl: string;
  finishTodoUrl: string;
  unsetTodoUrl: string;
  countTodoUrl: string;
  myalltodoUrl: string;
  mycreatedTodoUrl: string;
  createNumberUrl: string;

  todoNum: number;

  constructor(private http: HttpClient,
              private authService: AuthService
    ) {
    this.myTodoUrl = environment.myTodoUrl;
    this.addTodoUrl = environment.addTodoUrl;
    this.saveTodoUrl = environment.saveTodoUrl;
    this.removeTodoUrl = environment.removeTodoUrl;
    this.finishTodoUrl = environment.finishTodoUrl;
    this.unsetTodoUrl = environment.unsetTodoUrl;
    this.countTodoUrl = environment.countTodoUrl;
    this.myalltodoUrl = environment.myalltodoUrl;
    this.mycreatedTodoUrl = environment.mycreatedTodoUrl;
    this.createNumberUrl = environment.createNumberUrl;
  }

  loadTodoNumber(): Promise<number>  {
    const promise = new Promise<number>((resolve, reject) => {
      this.getToduNumber().subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          this.getTodoNum.emit(result.data);
          resolve(result.data);
        } else {
          reject();
        }
      });
    });
    return promise;
  }

  loadCreateNumber(): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
      this.getCreatedNumber().subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          this.createdTodoNum.emit(result.data);
          resolve(result.data);
        } else {
          reject();
        }
      });
    });
    return promise;
  }

  private getToduNumber() {
    const url = this.countTodoUrl + '/' + this.authService.getBizId() + '/' + this.authService.getUserId();
    return this.http.get(url);
  }

  private getCreatedNumber() {
    const url = this.createNumberUrl + '/' + this.authService.getBizId() + '/' + this.authService.getUserId();
    return this.http.get(url);
  }

  add(title: string, uid: number): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.postAdd(title, uid).subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          this.todoNum ++;
          this.getTodoNum.emit(this.todoNum);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

    return promise;
  }

  private postAdd(title: string, uid: number) {
    const url = this.addTodoUrl;
    const todo: Todo = {
      id: null,
      title,
      bizId: this.authService.getBizId(),
      uid,
      status: 0,
      createDate: null,
      createUid: this.authService.getUserId()
    };

    return this.http.post(url, todo);
  }

  save(value: Todo): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.postSave(value).subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    return promise;
  }

  private postSave(value: Todo) {
    const url = this.saveTodoUrl;
    return this.http.post(url, value);
  }

  remove(id: number): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.deleteTodo(id).subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          resolve(true);
          this.loadTodoNumber();
        } else {
          resolve(false);
        }
      });
    });
    return promise;
  }

  private deleteTodo(id: number) {
    const url = this.removeTodoUrl + '/' + id;
    return this.http.delete(url);
  }

  setTodo(value: boolean, id: number): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      if (value) {
        this.pubTodo(id).subscribe((result: MeeResult) => {
          if (result.statusCode === 0) {
            this.loadTodoNumber();
            this.loadCreateNumber();
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        this.unsetTodo(id).subscribe((result: MeeResult) => {
          if (result.statusCode === 0) {
            this.loadTodoNumber();
            this.loadCreateNumber();
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }

    });
    return promise;
  }


  private pubTodo(id: number) {
    const url = this.finishTodoUrl + '/' + id;
    return this.http.put(url, null);
  }

  private unsetTodo(id: number) {
    const url = this.unsetTodoUrl + '/' + id;
    return this.http.put(url, null);
  }

  loadMyTodo(pageNo: number, pageSize: number): Promise<Todo[]> {
    const promise = new Promise<Todo[]>((resolve, reject) => {
      this.getMyTodo(pageNo, pageSize).subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          const todoResult: TodoPageResult = result.data;
          const todoList = todoResult.todo;
          resolve(todoList);
          this.todoNum = todoResult.total;
          this.getTodoNum.emit(this.todoNum);
        } else {
          reject();
        }
      });
    });
    return promise;
  }

  private getMyTodo(pageNo: number, pageSize: number) {
    const url = this.myTodoUrl + '/' + this.authService.getBizId() +
                '/' + this.authService.getUserId() + '/' + pageNo + '/' + pageSize;
    return this.http.get(url);
  }

  loadMyAllTodo(pageNo: number, pageSize: number): Promise<Todo[]> {
    const promise = new Promise<Todo[]>((resolve, reject) => {
      this.getMyAllTodo(pageNo, pageSize).subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          const todoResult: TodoPageResult = result.data;
          const todoList = todoResult.todo;
          resolve(todoList);
          this.getMyAllTodoNum.emit(todoResult.total);
        } else {
          reject();
        }
      });
    });
    return promise;
  }

  private getMyAllTodo(pageNo: number, pageSize: number) {
    const url = this.myalltodoUrl + '/' + this.authService.getBizId() +
                '/' + this.authService.getUserId() + '/' + pageNo + '/' + pageSize;
    return this.http.get(url);
  }

  loadMyCreatedTodo(pageNo: number, pageSize: number): Promise<Todo[]> {
    const promise = new Promise<Todo[]>((resolve, reject) => {
      this.getMyCreatedTodo(pageNo, pageSize).subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          const todoResult: TodoPageResult = result.data;
          const todoList = todoResult.todo;
          resolve(todoList);
          this.getCreatedTodoNum.emit(todoResult.total);
        } else {
          reject();
        }
      });
    });
    return promise;
  }

  private getMyCreatedTodo(pageNo: number, pageSize: number) {
    const url = this.mycreatedTodoUrl + '/' + this.authService.getBizId() +
                '/' + this.authService.getUserId() + '/' + pageNo + '/' + pageSize;
    return this.http.get(url);
  }

}
