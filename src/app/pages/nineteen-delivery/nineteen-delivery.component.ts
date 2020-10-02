import { Component, OnInit } from '@angular/core';
import { NineteenService } from 'src/app/service/nineteen.service';
import { PlatFormInfo, NineTeenDeliverOrders, NineTeenLogistics, DeliveryInfo, MeeResult } from 'src/app/interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-nineteen-delivery',
  templateUrl: './nineteen-delivery.component.html',
  styleUrls: ['./nineteen-delivery.component.less']
})
export class NineteenDeliveryComponent implements OnInit {

  plats: PlatFormInfo[];

  selectedPlat: number;

  isLoading = false;

  dateRange: Date[] = [];

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  selectedOrder: string;

  orderData: NineTeenDeliverOrders[] = [];

  nineTeenDelivery: NineTeenLogistics[];

  constructor(private nineTeenService: NineteenService,
              private modal: NzModalService,
              private notification: NzNotificationService
    ) { }

  ngOnInit(): void {
    this.loadPlat();
  }

  loadPlat() {
    this.nineTeenService.loadPlatForm('19').subscribe((result => {
      this.plats = result;
      if (this.plats && this.plats.length > 0) {
        this.selectedPlat = this.plats[0].id;
        this.loadLogistics();
      } else {
        this.modal.error({
          nzTitle: '缺少店铺信息',
          nzContent: '请联系管理员添加店铺！'
        });
      }
    }));
  }

  loadLogistics() {
    this.nineTeenService.loadLogistics(this.selectedPlat).subscribe(result => this.nineTeenDelivery = result);
  }


  refreshCheckedStatus(): void {
    this.checked = this.orderData.every((item) => this.setOfCheckedId.has(item.orderId));
    this.indeterminate = this.orderData.some((item) => this.setOfCheckedId.has(item.orderId)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.orderData.forEach((item) => this.updateCheckedSet(item.orderId, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  search() {
    if (this.dateRange == null || this.dateRange.length < 2) {
      this.modal.error({
        nzTitle: '缺少时间',
        nzContent: '请选择查询范围！'
      });
    }

    const start = this.dateRange[0];
    start.setHours(0, 0, 0, 0);
    const end = this.dateRange[1];
    end.setHours(23, 59 , 59, 59);

    this.isLoading = true;
    this.nineTeenService.loadDeliveryOrders(this.selectedPlat, start, end).
        subscribe(result => this.orderData = result,
          error => this.modal.error({
          nzTitle: '搜索失败！',
          nzContent: error,
        }), () => this.isLoading = false);
  }

  submit() {
    const data: NineTeenDeliverOrders[] = this.orderData.filter(item => this.setOfCheckedId.has(item.orderId));
    if (!data || data.length <= 0) {
      this.modal.error({
        nzTitle: '缺少订单！',
        nzContent: '请选择需要发货的订单...'
      });

      return;
    }

    if (data.filter(item => this.setOfCheckedId.has(item.orderId)).filter(item => !item.deliveryCom).length > 0) {
      this.modal.error({
        nzTitle: '物流信息错误！',
        nzContent: '请选择物流公司...'
      });

      return;
    }

    const param: DeliveryInfo[] = data.filter(item => this.setOfCheckedId.has(item.orderId)).map((item: NineTeenDeliverOrders) => {
      const info: DeliveryInfo = {
        orderId: item.orderId,
        detailId: item.orderDetails.map(i => i.detail_id),
        expressId: item.deliveryCode,
        courierNumber: item.courierNumber
      };
      return info;
    });

    this.nineTeenService.delivery(this.selectedPlat, param).subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.modal.success({
          nzTitle: '发货成功！'
        });
      } else {
        this.modal.error({
          nzTitle: '发货失败！'
        });

        const errorOrder: string[] = result.data;
        this.notification.create(
          'error',
          '以下订单发货失败, 请手动提交',
          errorOrder.join('<br>')
        );
      }
    });

  }

  changeDelivery(value: number, order: NineTeenDeliverOrders) {
    this.selectedOrder = null;
    if (this.nineTeenDelivery.filter(item => item.id === value).length > 0) {
      order.deliveryCom = this.nineTeenDelivery.filter(item => item.id === value)[0].name;
      order.deliveryCode = value;
    }
  }

}
