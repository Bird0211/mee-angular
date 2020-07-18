import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeeResult } from 'src/app/interface';

@Component({
  selector: 'app-weimob-auth',
  templateUrl: './weimob-auth.component.html',
  styleUrls: ['./weimob-auth.component.less']
})
export class WeimobAuthComponent implements OnInit {

  status: string;

  title: string;

  subTitle: string;

  weimobAddcodeUrl: string;

  bizId: number;

  userId: number;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient) {
                this.weimobAddcodeUrl = environment.weimob_addcode_url;
               }

  ngOnInit(): void {
    this.bizId = this.authService.getBizId();
    this.userId = this.authService.getUserId();
    this.weimobAuthorize();
  }

  weimobAuthorize() {
    if (!this.bizId || this.bizId == null) {
      this.status = 'error';
      this.title = '登录信息有误';
      this.subTitle = '用户还没有登录,请先登录！';
      return;
    }

    let code: string;
    this.route.queryParams.subscribe(
      params => {
        code = params.code;
      }
    );

    if (!code || code == null) {
      this.status = 'error';
      this.title = '授权信息有误';
      this.subTitle = '没有授权信息, 请重新访问微盟订单进行授权！';
      return;
    }
    this.loadAuth(code);
  }

  loadAuth(code: string) {
    this.postAuth(code).subscribe((meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
        this.status = 'success';
        this.title = '微盟授权成功';
        this.subTitle = '点击按钮, 访问Hub页面';
      } else {
        this.status = 'error';
        this.title = '微盟授权失败';
        this.subTitle = '信息授权失败,请重新登录授权！';
      }
    });
  }

  postAuth(code: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        // 'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(this.weimobAddcodeUrl + '/' + this.bizId, 'code=' + code, httpOptions);
  }

  go() {
    const url = 'dashboard' + '/' + this.bizId + '/' + this.userId + '/' + this.authService.time + '/' + this.authService.nonce
                + '/' + this.authService.sign;

    this.router.navigate([url]);
  }

}
