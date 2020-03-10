import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeeResult } from '../interface';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

type Callback = (data: any)  => void;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  bizid: string; userid: string; time: string; nonce: string; sign: string;

  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
    this.paramInit();
  }

  initAuth(callback: Callback) {
    this.checkAuth().subscribe ((meeResult: MeeResult) => {
      const result = meeResult.statusCode === 0;
      callback(result);
    } );
  }

  private paramInit() {
    this.bizid = this.route.snapshot.paramMap.get('bizid');
    this.time = this.route.snapshot.paramMap.get('time');
    this.nonce = this.route.snapshot.paramMap.get('nonce');
    this.sign = this.route.snapshot.paramMap.get('sign');
    this.userid = this.route.snapshot.paramMap.get('userid');
  }

  private checkAuth() {
    return this.http.post(environment.authUrl,
      { bizId : this.bizid, userId: this.userid, time : this.time, nonce : this.nonce, sign : this.sign});
  }

}
