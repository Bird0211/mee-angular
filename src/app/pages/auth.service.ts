import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeeResult, YiYunUser, AuthParam } from '../interface';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

type Callback = (data: any)  => void;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private bizid: string; userid: string; time: string; nonce: string; sign: string;

  private user: YiYunUser;

  private userUrl: string;

  @Output() getLoggedInName: EventEmitter<YiYunUser> = new EventEmitter();

  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
        this.userUrl = environment.userUrl;
  }

  initAuth(authParam: AuthParam): Promise<boolean> {
    console.log('InitAuth');
    const promise = new Promise<boolean>((resolve, reject) => {
      this.paramInit(authParam);
      if (!this.bizid) {
        resolve(false);
        return;
      }

      this.checkAuth().subscribe ((meeResult: MeeResult) => {
        const result = meeResult.statusCode === 0;
        resolve(result);
        if (result) {
          localStorage.setItem('bizId', this.bizid);
          localStorage.setItem('userId', this.userid);
          localStorage.setItem('time', this.time);
          localStorage.setItem('nonce', this.nonce);
          localStorage.setItem('sign', this.sign);

          this.getYiyunUser().then((user: YiYunUser) => {
            this.user = user;
            this.getLoggedInName.emit(user);
            }
          );
        } else {
          localStorage.removeItem('bizId');
          localStorage.removeItem('userId');
          localStorage.removeItem('time');
          localStorage.removeItem('nonce');
          localStorage.removeItem('sign');
        }
      });

    });

    return promise;
  }

  private paramInit(authParam: AuthParam) {
    this.bizid = authParam.bizid;
    this.time = authParam.time;
    this.nonce = authParam.nonce;
    this.sign = authParam.sign;
    this.userid = authParam.userid;
  }

  public loadAuthParam(): AuthParam {
    const param: AuthParam = {
      bizid: this.getBizId().toString(),
      time: this.getTime(),
      nonce: this.getNonce(),
      sign: this.getSign(),
      userid: this.getUserId().toString()
    };
    return param;
  }

  public getAuthParam(route: ActivatedRoute) {
    const bizid = route.snapshot.paramMap.get('bizid');
    const time = route.snapshot.paramMap.get('time');
    const nonce = route.snapshot.paramMap.get('nonce');
    const sign = route.snapshot.paramMap.get('sign');
    const userid = route.snapshot.paramMap.get('userid');

    const param: AuthParam = {
      bizid,
      time,
      nonce,
      sign,
      userid
    };
    return param;
  }

  private checkAuth() {
    return this.http.post(environment.authUrl,
      { bizId : this.bizid, userId: this.userid, time : this.time, nonce : this.nonce, sign : this.sign});
  }

  public getBizId(): number {
    return Number(localStorage.getItem('bizId'));
  }

  public getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  public getTime(): string {
    return localStorage.getItem('time');
  }

  public getNonce(): string {
    return localStorage.getItem('nonce');
  }

  public getSign(): string {
    return localStorage.getItem('sign');
  }

  public getYiyunUser(): Promise<YiYunUser> {
    const userPromise = new Promise<YiYunUser>((resolve, reject) => {
      if (this.user) {
        this.getLoggedInName.emit(this.user);
        resolve(this.user);
      } else {
        this.getUser().subscribe((result: MeeResult) => {
          if (result.statusCode === 0) {
             this.user = result.data;
             resolve(result.data);
          } else {
            reject();
          }
        });
      }
    });
    return userPromise;
  }

  private getUser() {
    const url = this.userUrl + '/' + this.getBizId() + '/' + this.getUserId();
    return this.http.get(url);
  }

}
