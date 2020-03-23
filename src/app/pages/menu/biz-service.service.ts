import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { MeeResult } from 'src/app/interface';

type Callback = (data: MeeResult)  => void;

@Injectable({
  providedIn: 'root'
})

export class BizServiceService {
  bizUrl: string;
  bizMenuUrl: string;

  constructor(private http: HttpClient) {
    this.bizUrl = environment.bizUrl;
    this.bizMenuUrl = environment.bizMenuUrl;
  }

  loadBiz(callback: Callback) {
    const url = this.bizUrl + '/all';
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        // 'Authorization': 'my-auth-token'
      })
    };

    const req = new HttpRequest('GET', url, '' , httpOptions);
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (e: HttpResponse<MeeResult>) => {
          const response: MeeResult = e.body;
          callback(response);
        },
        (e) => {
          console.log(e);
        }
      );
  }

  loadBizMenu(bizId: string, callback: Callback) {
    const url = this.bizMenuUrl + '/' + bizId;
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        // 'Authorization': 'my-auth-token'
      })
    };

    const req = new HttpRequest('GET', url, '' , httpOptions);
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (e: HttpResponse<MeeResult>) => {
          const response: MeeResult = e.body;
          callback(response);
        },
        (e) => {
          console.log(e);
        }
      );
  }
}

