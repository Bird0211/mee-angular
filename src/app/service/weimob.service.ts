import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../pages/auth.service';
import { Observable, Subscriber } from 'rxjs';
import { WeimobOrderData, MeeResult, DeliveryOrderVo, DeliverySkuInfo, WeimobOrder, WeimobOrderListResponse, WeimobOrderListReq } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class WeimobService {

  deliveryListUrl: string;
  deliveryOrderUrl: string;
  orderlistUrl: string;

  constructor(private http: HttpClient,
              private authService: AuthService
    ) {
    this.deliveryListUrl = environment.weimobDeliveryListUrl;
    this.deliveryOrderUrl = environment.deliveryOrderUrl;
    this.orderlistUrl = environment.weimob_order_list_url;
  }

  loadDeliveryList(startDate: Date, endDate: Date): Observable<WeimobOrderData[]> {
    const result = new Observable<WeimobOrderData[]>((observable: Subscriber<WeimobOrderData[]>) => {
      this.postDeliverList(startDate, endDate).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(meeResult.data);
          observable.complete();
        } else {
          observable.error(meeResult.description);
        }
      }, observable.error, observable.complete );
    });
    return result;
  }

  private postDeliverList(startDate: Date, endDate: Date) {
    const url = this.deliveryListUrl + '/' + this.authService.getBizId();
    const param = {
      createStartTime: startDate.getTime(),
      createEndTime: endDate.getTime()
    };

    return this.http.post(url, param);
  }

  delivery(orders: WeimobOrderData[]): Observable<MeeResult> {
    const result = new Observable<MeeResult>((observable: Subscriber<MeeResult>) => {
      this.sendBatchDelivery(orders).subscribe((meeResult: MeeResult) => {
        observable.next(meeResult);
      }, observable.error, observable.complete );
    });
    return result;
  }

  private sendBatchDelivery(orders: WeimobOrderData[]) {
    const url = this.deliveryOrderUrl + '/' + this.authService.getBizId();
    const data: DeliveryOrderVo[] = orders.map(item => {
      const order: DeliveryOrderVo = {
        orderId: item.orderNo.toString(),
        deliveryId: item.deliveryOrderId.toString(),
        expressComCode: item.deliveryCode,
        name: item.receiverName,
        address: item.receiverAddress,
        phone: item.receiverMobile,
        id_num: null,
        split: item.split,
        skuInfo: item.itemList.map(i => {
          const s: DeliverySkuInfo = {
            sku: i.goodsCode,
            content: i.goodsTitle,
            skuNum: i.skuNum,
            skuId: i.skuId,
            itemId: i.id
          };
          return s;
        })
      };
      return order;
    });
    return this.http.post(url, data);
  }

  loadOrderList(param: WeimobOrderListReq): Observable<WeimobOrderListResponse> {
    const result = new Observable<WeimobOrderListResponse>((observable: Subscriber<WeimobOrderListResponse>) => {
      this.getOrderList(param).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(meeResult.data);
        } else {
          observable.error(meeResult.description);
        }
      }, observable.error, observable.complete );
    });
    return result;
  }

  getOrderList(param: WeimobOrderListReq) {
    const url = this.orderlistUrl + '/' + this.authService.getBizId();
    return this.http.post(url, param);
  }

}
