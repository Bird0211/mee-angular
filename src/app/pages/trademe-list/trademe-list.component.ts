import { Component, OnInit } from '@angular/core';
import { PlatformService } from 'src/app/service/platform.service';
import { PlatFormInfo, MeeResult, TradeMeSoldOrderResp, TradeMePayResult,
          NzPostConfig, PaidSoltOrder, ShippedItem, ShippedPurchase, TradeMeSoltOrder, LabelStatusResult } from 'src/app/interface';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NzPostConfigService } from 'src/app/service/nz-post-config.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { XlsxService } from '../invoice-ocr/update-file/xlsx.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-trademe-list',
  templateUrl: './trademe-list.component.html',
  styleUrls: ['./trademe-list.component.less']
})
export class TrademeListComponent implements OnInit {

  trademeInfos: PlatFormInfo[];

  store: number;

  filters = ['Last45Days', 'Last30Days', 'Last7Days', 'Last3Days', 'Last24Hours', 'LastHour'];

  filter: string;

  soldItemUrl: string;

  paidItemUrl: string;

  shippedItemUrl: string;

  isLongding = false;

  isVisible = false;

  isLoadingLabelStatus = false;

  orders: TradeMeSoldOrderResp;

  tabIndex = 0;

  sendItems: number[];
  shippedItem: PaidSoltOrder[];

  confirmPayLoading = false;
  shippedLoading = false;

  selectedConfig: NzPostConfig;

  nzpostConfigs: NzPostConfig[];

  paidOrder: PaidSoltOrder[];

  constructor(
    private platformService: PlatformService,
    private modal: NzModalService,
    private http: HttpClient,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private nzPostConfigService: NzPostConfigService,
    private authService: AuthService,
    private router: Router,
    private xlsxService: XlsxService
  ) {
    this.soldItemUrl = environment.tradeMeSoldItemUrl;
    this.paidItemUrl = environment.tradeMeSPaidItemUrl;
    this.shippedItemUrl = environment.tradeMeShippedItemUrl;
  }

  ngOnInit(): void {
    this.filter = 'Last24Hours';
    this.loadTradeMeStore();
  }

  loadTradeMeStore() {
    this.platformService.loadPlatFormInfo('trademe').then((result: PlatFormInfo[]) => {
      this.trademeInfos = result;
      if (this.trademeInfos && this.trademeInfos.length > 0) {
        this.store = this.trademeInfos[0].id;
      }
    });
  }

  search() {
    if (!this.store) {
      this.modal.warning({
        nzTitle: 'Missing query conditions TradeMe Store',
        nzContent: 'Please select a TradeMe Store!'
      });
      return ;
    }

    if (!this.filter) {
      this.modal.warning({
        nzTitle: 'Missing query condition',
        nzContent: 'Please select a Filter Condition!'
      });
      return ;
    }

    this.postTrdeMe();
  }

  postTrdeMe() {
    this.isLongding = true;
    this.submitTradeMee().subscribe((result: MeeResult) => {
      this.isLongding = false;
      if (result.statusCode === 0) {
        this.orders = result.data;
        if (this.orders.paymentReceived) {
          this.paidOrder = this.orders.paymentReceived.map(item => this.changePaidOrder(item));
        }
      } else {
        this.modal.error({
          nzTitle: 'Search Error!',
          nzContent: result.description
        });
      }
    });
  }

  submitTradeMee() {
    let status = 10;
    if (this.tabIndex === 0) {
      status = 10;
    } else if (this.tabIndex === 1) {
      status = 20;
    } else if (this.tabIndex === 2) {
      status = 30;
    } else if (this.tabIndex === 3) {
      status = 40;
    }
    const url = this.soldItemUrl + '/' + this.store;
    return this.http.post(url, {filter: this.filter, status});
  }

  selectSentItem(value: number[]) {
    this.sendItems = value;
  }

  selectShippedItem(value: PaidSoltOrder[]) {
    this.shippedItem = value;
  }

  confirmPayment() {
    if (!this.sendItems || this.sendItems.length <= 0) {
      this.modal.error({
        nzTitle: 'Missing Items!',
        nzContent: 'please select Items first!'
      });
      return;
    }

    this.confirmPayLoading = true;
    this.postPaidItem().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.message.success('Submit Success!');
        const data: TradeMePayResult[] = result.data;
        if (data && data.length > 0 && data.filter(item => !item.result).length > 0) {
          const error = data.filter(item => !item.result).join('<br>');
          this.notification.create(
            error,
            'Submit Error Purchase',
            error
          );
        }
        this.confirmPayLoading = false;
        this.postTrdeMe();
      } else {
        this.modal.error({
          nzTitle: 'Submit Error!',
          nzContent: result.description
        });
      }
    });

  }

  postPaidItem() {
    const url = this.paidItemUrl + '/' + this.store;
    const data = {purchaseId: this.sendItems};

    return this.http.post(url, data);
  }

  shipped() {
    if (!this.shippedItem || this.shippedItem.length <= 0) {
      this.modal.error({
        nzTitle: 'Missing Items!',
        nzContent: 'please select Items first!'
      });
      return;
    }

    if (this.shippedItem.filter(item => !item.dimensions ||
          item.dimensions.length <= 0 ||
          item.dimensions.filter(d => !d.volumes || d.volumes === 0 || !d.weight || d.weight === 0).length > 0 ).length > 0) {
      console.log(this.shippedItem);
      this.modal.error({
        nzTitle: '包裹体积,重量错误!',
        nzContent: '请填写包裹体积和重量!'
      });
      return;
    }

    if (this.shippedItem.filter(item => !item.deliveryAddress || !item.deliveryAddress.address1).length > 0) {
      this.modal.error({
        nzTitle: '缺少地址!',
        nzContent: '请填写订单地址!'
      });
      return;
    }

    if (!this.selectedConfig) {
      this.modal.error({
        nzTitle: '缺少NzPost信息!',
        nzContent: '请选择NzPost信息!'
      });
      return;
    }

    if (this.shippedItem.filter(item => item.dimensions.filter(i => !i.serviceCode).length > 0).length > 0) {
      this.modal.error({
        nzTitle: '缺少 NzPost Service 信息!',
        nzContent: '请选择NzPost Service!'
      });
      return;
    }

    this.submit();
  }

  getPurche(entity: PaidSoltOrder): ShippedPurchase {
    const item: ShippedPurchase = {
      orderId: entity.orderId,
      deliveryName: entity.deliveryAddress.name,
      deliveryPhone: entity.deliveryAddress.phoneNumber,
      deliveryEmail: entity.buyer.email,
      street: entity.deliveryAddress.address1,
      suburb: entity.deliveryAddress.suburb,
      city: entity.deliveryAddress.city,
      postcode: entity.deliveryAddress.postcode,
      countryCode: 'NZ',
      carrier: entity.carrier,
      dimensions: entity.dimensions
    };

    return item;
  }

  postShipItem() {
    const url = this.shippedItemUrl + '/' + this.selectedConfig.id;
    const data: ShippedItem = {
      purches: this.shippedItem.map(item => this.getPurche(item))
    };

    return this.http.post(url, data);
  }

  selectedIndexChange(value: number) {
    this.tabIndex = value;
    if (value === 1) {
      this.loadNzPostConfig();
    }
  }

  submit() {
    this.shippedLoading = true;
    this.postShipItem().subscribe((result: MeeResult) => {
      this.shippedLoading = false;
      if (result.statusCode === 0) {
        this.message.success('Submit Success!');
        // this.postTrdeMe();
      } else {
        this.modal.error({
          nzTitle: 'Submit Error!',
          nzContent: result.description
        });
      }

      const data: TradeMePayResult[] = result.data;
      if (data && data.length > 0 && data.filter(item => !item.result).length > 0) {
        const errorStr: string = data.filter(item => !item.result).map(item => item.purchaseId).join('<br>');
        this.notification.create (
          'error',
          'Submit Error Purchase',
          errorStr
        );
      }

      if (data && data.length > 0 && data.filter(item => item.result).length > 0 ) {

        data.filter(item => item.result).forEach(item => {
          this.paidOrder.filter(i => i.orderId === item.purchaseId).
            forEach(i => i.consignmentId = item.consignmentId);
        });

        this.labelStatus(data.map(item => item.consignmentId));
      }
    });
  }

  loadNzPostConfig() {
    this.nzPostConfigService.loadNzConfig(this.authService.getBizId()).subscribe((result: NzPostConfig[]) => {
      if (!result || result.length <= 0) {
        this.modal.confirm({
          nzTitle: '您还没有填写NzPost信息?',
          nzContent: '<b>是否现在设置NzPost物流信息</b>',
          nzOkText: 'Yes',
          nzOnOk: () => this.router.navigate(['nzpost-config']),
          nzCancelText: 'No'
        });
      } else {
        this.nzpostConfigs = result;
      }
    });
  }

  changePaidOrder(order: TradeMeSoltOrder) {
    const paidOrder: PaidSoltOrder = {
      orderId: order.purchaseId.toString(),
      reference: order.reference,
      soldDate: order.soldDate,
      purchaseId: order.purchaseId,
      buyer: order.buyer,
      deliveryAddress: order.deliveryAddress,
      carrier: null,
      items: [order.items],
      paymentDetail: order.paymentDetail,
      dimensions: [{volumes: 1, weight: 1, length: 100, width: 100, height: 100}]
    };
    return paidOrder;
  }

  labelStatus(consignmentIds: string[]) {
    this.isLoadingLabelStatus = true;
    this.getlabelStatus(consignmentIds, 0);
  }

  getlabelStatus(consignmentIds: string[], times: number) {
    if (times > 5) {
      this.isLoadingLabelStatus = false;
      this.message.error('NzPost 申请失败!');
      return;
    }
    const timeOutId = setTimeout(() => {
      this.nzPostConfigService.labelStatus(consignmentIds).subscribe((result: LabelStatusResult[]) => {
        if (result != null) {
          for (const iterator of result) {
            this.paidOrder.filter(item => item.consignmentId && item.consignmentId === iterator.consignmentId).
              forEach(item => item.labelTrack = iterator.tracks);
          }
        }
        consignmentIds = result.filter(item => item.tracks && item.tracks.filter(i => i.status !== 'Complete').length > 0)
            .map(i => i.consignmentId);
        console.log(consignmentIds);
        if (!consignmentIds || consignmentIds.length <= 0) {
          clearTimeout(timeOutId);
          this.isLoadingLabelStatus = false;
          this.message.success('申请成功！');
          this.downloadData();
          
        } else {
          this.getlabelStatus(consignmentIds, times++);
        }
      });
    }, 500);
  }

  downloadData() {
    const datas = [];
    this.shippedItem.filter(item => item.labelTrack).forEach(item => {
      item.items.forEach(i => {
        const data = item.orderId + ',' +
                     item.deliveryAddress.name + ',' +
                     '' + ',' +
                     item.deliveryAddress.address1 + ',' +
                     item.deliveryAddress.phoneNumber + ',' +
                     i.sku + ',' +
                     i.name + ',' +
                     i.quantity + ',' +
                     item.labelTrack[0] + '\n';
        datas.push({key: data});
      });
    });

    this.xlsxService.downloadExl(datas, 'csv', 'TradeMe-Export', true);
  }



}
