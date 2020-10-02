import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MeeResult, NzPostConfig, pageUggOrder, UggDetail, UggOrder, UggOrderCount, UggQueryOrderParams } from '../interface';
import { AuthService } from '../pages/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UggService {

  uggTokenUrl: string;
  uggOrderSaveUrl: string;
  uggOrderSearchUrl: string;
  uggOrderCountUrl: string;
  uggOrderDetailBySKUUrl: string;

  constructor(private authService: AuthService,
              private http: HttpClient
    ) {
    this.uggTokenUrl = environment.uggTokenUrl;
    this.uggOrderSaveUrl =  environment.uggOrderSaveUrl;
    this.uggOrderSearchUrl = environment.uggOrderSearchUrl;
    this.uggOrderCountUrl = environment.uggOrderCountUrl;
    this.uggOrderDetailBySKUUrl = environment.uggOrderDetailBySKUUrl;
  }

  setToken(username: string, password: string): Observable<void> {
    const result = new Observable<void>((observable: Subscriber<void>) => {
      this.postToken(username, password).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next();
        } else {
          observable.error();
        }
      }, observable.error, observable.complete );
    });
    return result;
  }

  private postToken(userName: string, password: string) {
    const url = this.uggTokenUrl + '/' + this.authService.getBizId();
    const httpOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
    };

    const body = 'username=' + userName + '&password=' + password;
    return this.http.post(url, body, httpOptions);
  }

  saveOrder(uggOrder: UggOrder): Observable<boolean> {
    const result = new Observable<boolean>((observable: Subscriber<boolean>) => {
      this.putOrder(uggOrder).subscribe((meeResult: MeeResult) => {
        observable.next(meeResult.statusCode === 0);
      }, observable.error, observable.complete );
    });
    return result;
  }

  private putOrder(uggOrder: UggOrder) {
    const url = this.uggOrderSaveUrl + '/' + this.authService.getBizId();
    return this.http.put(url, uggOrder);
  }

  searchOrder(params: UggQueryOrderParams, pageIndex: number, pageSize: number): Observable<pageUggOrder> {
    const result = new Observable<pageUggOrder>((observable: Subscriber<pageUggOrder>) => {
      this.postSearchOrder(params, pageIndex, pageSize).subscribe((meeResult: MeeResult) => {
        if (meeResult && meeResult.statusCode === 0) {
          observable.next(meeResult.data);
        } else {
          observable.error();
        }
      }, observable.error, observable.complete );
    });
    return result;
  }


  private postSearchOrder(params: UggQueryOrderParams, pageIndex: number, pageSize: number) {
    const url = this.uggOrderSearchUrl + '/' + pageIndex + '/' + pageSize;
    return this.http.post(url, params);
  }


  getOrderCount(params: UggQueryOrderParams): Observable<UggOrderCount[]> {
    const result = new Observable<UggOrderCount[]>((observable: Subscriber<UggOrderCount[]>) => {
      this.postOrderCount(params).subscribe((meeResult: MeeResult) => {
        if (meeResult && meeResult.statusCode === 0) {
          observable.next(meeResult.data);
        } else {
          observable.error();
        }
      }, observable.error, observable.complete );
    });
    return result;
  }

  private postOrderCount(params: UggQueryOrderParams) {
    const url = this.uggOrderCountUrl;
    return this.http.post(url, params);
  }

  getOrderDetailBySKU(sku: string): Observable<UggDetail> {
    const result = new Observable<UggDetail>((observable: Subscriber<UggDetail>) => {
      this.getDetail(sku).subscribe((meeResult: MeeResult) => {
        if (meeResult && meeResult.statusCode === 0) {
          observable.next(meeResult.data);
        } else {
          observable.error();
        }
      }, observable.error, observable.complete );
    });
    return result;
  }

  private getDetail(sku: string) {
    const url = this.uggOrderDetailBySKUUrl + '/' + this.authService.getBizId() + '/' + sku;
    return this.http.get(url);
  }

}
