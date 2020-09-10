import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../pages/auth.service';
import { environment } from 'src/environments/environment';
import { Observable, Subscriber } from 'rxjs';
import { PlatFormInfo, MeeResult, NineTeenDeliverOrders, NineTeenLogistics, DeliveryInfo } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class NineteenService {

  nineTeenPlatUrl: string;
  deliverOrdersUrl: string;
  logicsticeUrl: string;
  deliveryUrl: string;

  constructor(private http: HttpClient,
              private authService: AuthService
    ) {
      this.nineTeenPlatUrl = environment.platUrl;
      this.deliverOrdersUrl = environment.nineTeenDeliveryUrl;
      this.logicsticeUrl = environment.logicsticeUrl;
      this.deliveryUrl = environment.deliveryUrl;
    }


  loadPlatForm(platCode: string): Observable<PlatFormInfo []> {
    const result = new Observable<PlatFormInfo[]>((observable: Subscriber<PlatFormInfo[]>) => {
      this.getPlat(platCode).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(meeResult.data);
        } else {
          observable.error();
        }
      }, observable.error, observable.complete );
    });
    return result;
  }

  private getPlat(platCode: string) {
    const url = this.nineTeenPlatUrl + '/' + this.authService.getBizId() + '/' + platCode;
    return this.http.get(url);
  }

  loadDeliveryOrders(platId: number, start: Date, end: Date): Observable<NineTeenDeliverOrders[]> {
    const result = new Observable<NineTeenDeliverOrders[]>((observable: Subscriber<NineTeenDeliverOrders[]>) => {
      this.postDeliveryOrders(platId, start, end).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(meeResult.data),
          observable.complete();
        } else {
          observable.error();
        }
      }, observable.error,
         observable.complete );
    });
    return result;
  }

  private postDeliveryOrders(platId: number, start: Date, end: Date) {
    const url = this.deliverOrdersUrl + '/' + this.authService.getBizId() + '/' + platId;
    const param = {
      createStartTime: start.toISOString().split('T')[0],
      createEndTime: end.toISOString().split('T')[0]
    };

    return this.http.post(url, param);
  }

  loadLogistics(platId: number): Observable<NineTeenLogistics []> {
    const result = new Observable<NineTeenLogistics[]>((observable: Subscriber<NineTeenLogistics[]>) => {
      this.getLogisties(platId).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(meeResult.data);
        } else {
          observable.error();
        }
      }, observable.error, observable.complete );
    });
    return result;
  }


  private getLogisties(platId: number) {
    const url = this.logicsticeUrl + '/' + platId;
    return this.http.get(url);
  }

  delivery(platId: number, param: DeliveryInfo[]): Observable<MeeResult> {
    const result = new Observable<MeeResult>((observable: Subscriber<MeeResult>) => {
      this.postDelivery(platId, param).subscribe((meeResult: MeeResult) => {
        observable.next(meeResult);
      }, observable.error, observable.complete );
    });
    return result;
  }

  private postDelivery(platId: number, param: DeliveryInfo[]) {
    const url = this.deliveryUrl + '/' + platId; 
    return this.http.post(url, param);
  }

}
