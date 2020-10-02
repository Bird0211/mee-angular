import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { YiYunUser, AuthParam } from 'src/app/interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CurrencyService } from 'src/app/service/currency.service';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input() isCollapsed: boolean | true;

  @Output() isCollapsedChange = new EventEmitter<boolean>();

  user: YiYunUser;

  isZh = true;

  currency: number;

  todoNumber: number;


  constructor(public translate: TranslateService,
              public message: NzMessageService,
              public http: HttpClient,
              public authService: AuthService,
              public route: ActivatedRoute,
              private currencyService: CurrencyService,
              private router: Router,
              private todoService: TodoService
      ) {
        translate.addLangs(['en', 'zh']);
        translate.setDefaultLang('zh');
        translate.use('zh');

        authService.getLoggedInName.subscribe((yiYunUser: YiYunUser) => this.changeName(yiYunUser));
        this.todoService.getTodoNum.subscribe((result: number) => this.todoNumber = result);
  }

  ngOnInit(): void {
    this.loadCurrency();
    this.loadTodoNumber();
  }

  changeLangus() {
    if (this.translate.currentLang === 'zh') {
        this.translate.use('en');
    } else {
      this.translate.use('zh');
    }
  }

  changeTrigger() {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

  private changeName(user: YiYunUser): void {
    this.user = user;
  }

  loadCurrency() {
    this.currencyService.loadCurrency().then(item => this.currency = item);
  }

  jumpback() {
    const param: AuthParam = this.authService.loadAuthParam();
    this.router.navigate(['dashboard', param.bizid,
            param.userid,
            param.time,
            param.nonce,
            param.sign]);
  }

  loadTodoNumber() {
    this.todoService.loadTodoNumber().then((result: number) => {
      this.todoNumber = result;
    });
  }

}
