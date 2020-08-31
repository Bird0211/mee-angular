import { Component, OnInit } from '@angular/core';
import { PlatFormInfo, MeeResult, TradeMeToken } from 'src/app/interface';
import { PlatformService } from 'src/app/service/platform.service';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trademe',
  templateUrl: './trademe.component.html',
  styleUrls: ['./trademe.component.less']
})
export class TrademeComponent implements OnInit {

  dataSet: PlatFormInfo[];

  tradeMeAccessTokenUrl: string;

  constructor(private platformService: PlatformService,
              private message: NzMessageService,
              private authService: AuthService,
              private http: HttpClient,
              private route: ActivatedRoute

    ) {
      this.tradeMeAccessTokenUrl = environment.tradeMeAccessTokenUrl;
    }

  ngOnInit(): void {
    this.assessToken();
    this.loadPlatForm();
  }

  loadPlatForm() {
    this.platformService.loadPlatFormInfo('trademe').then((result: PlatFormInfo[]) => {
      this.dataSet = result;
    });
  }

  assessToken() {
    this.route.queryParams.subscribe( param => {
      const token = param.oauth_token;
      const tokenVerifier = param.oauth_verifier;
      console.log('Token', token);
      console.log('TokenVerifier', tokenVerifier);
      if (token && tokenVerifier) {
        this.postAccessToken(token, tokenVerifier).subscribe((result: MeeResult) => {
          if (result.statusCode === 0) {
            this.message.success('添加成功!');
            this.loadPlatForm();
          } else {
            this.message.error('添加失败!');
          }
        });
      }
    });
  }

  del(id: number) {
    this.platformService.delPlatForm(id).then((result: boolean) => {
      if (result) {
        this.message.success('删除成功!');
        this.dataSet = this.dataSet.filter(item => item.id !== id);
      } else {
        this.message.error('删除失败!');
      }
    });
  }



  postAccessToken(token: string, tokenVerifier: string) {
    const url = this.tradeMeAccessTokenUrl + '/' + this.authService.getBizId();
    return this.http.post(url, {token, tokenVerifier});
  }

}
