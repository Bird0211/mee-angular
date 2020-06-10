import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthParam } from 'src/app/interface';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  alertMsg: string;

  isLogin = false;

  constructor(public route: ActivatedRoute,
              public http: HttpClient,
              public message: NzMessageService,
              public authService: AuthService
    ) { }

  ngOnInit(): void {
    const authParam: AuthParam = this.authService.getAuthParam(this.route);
    this.authService.initAuth(authParam).then((result: boolean) => {
      this.isLogin = result;
      if (!result) {
        this.message.error('账号异常,请重新登录');
      } else {
        this.loadAlertMsg();
      }
    });
  }

  loadAlertMsg() {
    // this.alertMsg = '您的账号将于7天后到期，请尽快充值！';
  }

}
