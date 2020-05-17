import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MeeResult, Menu } from 'src/app/interface';
import { filter } from 'rxjs/operators';
import { NzIconService } from 'ng-zorro-antd';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  animations: [
    trigger('hideDiv', [
      state('open', style({
        display: 'block',
        opacity: 1
      })),
      state('closed', style({
        display: 'none',
        opacity: 0
      })),
      transition('open <=> closed', [
        animate('0.5s 300ms ease-in-out', keyframes ([
          style({ opacity: 0.2, offset: 0.7 })
        ]))
      ])
    ]),
    trigger('showFrame', [
      state('open', style({
        display: 'block',
        height: '800px',
        opacity: 1
      })),
      state('closed', style({
        display: 'none',
        height: '0px',
        opacity: 0
      })),
      transition('open <=> closed', [
        animate('0.5s 300ms ease-in-out', keyframes ([
          style({ opacity: 0.2, offset: 0.7 })
        ]))
      ])
    ])
  ],
  providers: [AuthService]
})
export class MenuComponent implements OnInit {

  userMenuUrl: string;

  menus: Menu[];

  showDiv = true;

  isShowRoute = false;

  isShowIFrame = false;

  jumpurl: SafeResourceUrl = '';

  constructor(private modalService: NzModalService,
              private http: HttpClient,
              private iconService: NzIconService,
              private sanitizer: DomSanitizer,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
              this.userMenuUrl = environment.usermenuUrl;
              this.iconService.fetchFromIconfont({
                scriptUrl: environment.iconUrl
              });
  }

  ngOnInit() {
    this.authService.initAuth((result) => {
        if (!result) {
          this.modalService.error({
            nzTitle: '请重新登录',
            nzContent: '访问超时,请重新登录!',
            nzClosable: false,
            nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
          });
        } else {
          this.loadMenu();
        }
    });
  }


  loadMenu() {
    const userId = this.authService.getUserId();
    const bizId = this.authService.getBizId();

    // const body = 'userId=' + userId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        // 'Authorization': 'my-auth-token'
      })
    };

    const req = new HttpRequest('GET', this.userMenuUrl + '/' + bizId + '/' + userId, '' , httpOptions);

    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (e: HttpResponse<MeeResult>) => {
          const response: MeeResult = e.body;
          if (response.statusCode === 0 && response.data != null) {
            this.menus = response.data;
          }
        },
        (e) => {
          console.log(e);
        }
      );

  }


  jumpto(menu: Menu) {
    this.showDiv = false;
    if (menu.type === '0') {
      this.isShowRoute = true;
      this.isShowIFrame = false;
      this.router.navigate([menu.url], {relativeTo: this.route, skipLocationChange: true});
    } else {
      this.isShowRoute = false;
      this.isShowIFrame = true;
      console.log('MenuUrl: ', menu.url);
      const url = menu.url +  '&bid=' + this.authService.getBizId() + '&uid=' + this.authService.getUserId() +
              '&v=' + Date.parse(new Date().toString());
      this.jumpurl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      console.log(this.jumpurl);
    }
  }

  jumpback() {
    this.showDiv = true;
    this.isShowIFrame = false;
    this.isShowRoute = false;
  }

}
