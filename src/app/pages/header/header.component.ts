import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { YiYunUser, MeeResult, AuthParam } from 'src/app/interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';

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

  currency: string;

  currencyUrl: string;

  constructor(public translate: TranslateService,
              public message: NzMessageService,
              public http: HttpClient,
              public authService: AuthService,
              public route: ActivatedRoute,
              private router: Router
      ) {
        translate.addLangs(['en', 'zh']);
        translate.setDefaultLang('zh');
        translate.use('zh');

        this.currencyUrl = environment.currencyUrl;

        authService.getLoggedInName.subscribe((yiYunUser: YiYunUser) => this.changeName(yiYunUser));
  }

  ngOnInit(): void {
    this.loadCurrency();
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

  loadCurrency() {
    this.getCurrency().subscribe((resuult: MeeResult) => {
      if (resuult.statusCode === 0) {
        this.currency = resuult.data.rate;
      }
    });
  }

  getCurrency() {
    return this.http.get(this.currencyUrl);
  }

  jumpback() {
    const param: AuthParam = this.authService.loadAuthParam();
    this.router.navigate(['dashboard', param.bizid,
            param.userid,
            param.time,
            param.nonce,
            param.sign]);
  }

}
