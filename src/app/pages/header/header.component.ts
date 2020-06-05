import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { YiYunUser } from 'src/app/interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input() isCollapsed = false;

  @Output() isCollapsedChange = new EventEmitter<boolean>();

  user: YiYunUser;

  isZh = true;

  constructor(public translate: TranslateService,
              public message: NzMessageService,
              public http: HttpClient,
              public authService: AuthService,
              public route: ActivatedRoute
      ) {
        translate.addLangs(['en', 'zh']);
        translate.setDefaultLang('zh');
        translate.use('zh');

        console.log('Header getLoginInfo');
        authService.getLoggedInName.subscribe((yiYunUser: YiYunUser) => this.changeName(yiYunUser));
  }

  ngOnInit(): void {
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
    console.log('header User', user);
    this.user = user;
  }

}
