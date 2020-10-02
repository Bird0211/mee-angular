import { Component, OnInit } from '@angular/core';
import { WeimobOrderData, MeeResult } from 'src/app/interface';
import { WeimobService } from 'src/app/service/weimob.service';
import { tick } from '@angular/core/testing';
import { title } from 'process';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-weimob-delivery',
  templateUrl: './weimob-delivery.component.html',
  styleUrls: ['./weimob-delivery.component.less']
})
export class WeimobDeliveryComponent implements OnInit {

  dateRange: Date[] = [];

  orderData: WeimobOrderData[];

  isLoading = false;

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  selectedOrder: number;
  weimobDelivery = [
    {code: 'ftd', com: '富腾达快递'},
    {code: 'shunfeng', com: '顺丰速运'},
    {code: 'flyway', com: '程光快递' }
  ];

  constructor(private modal: NzModalService,
              private weimobService: WeimobService,
              private notification: NzNotificationService
    ) { }

  ngOnInit(): void {
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
    this.weimobService.loadDeliveryList(start, end).
        subscribe(result => this.orderData = result, error => this.modal.error({
          nzTitle: '搜索失败！',
          nzContent: error
        }), () => this.isLoading = false);

  }


  refreshCheckedStatus(): void {
    this.checked = this.orderData.every((item) => this.setOfCheckedId.has(item.orderNo));
    this.indeterminate = this.orderData.some((item) => this.setOfCheckedId.has(item.orderNo)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.orderData.forEach((item) => this.updateCheckedSet(item.orderNo, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  submit() {
    const data: WeimobOrderData[] = this.orderData.filter(item => this.setOfCheckedId.has(item.orderNo));
    if (!data || data.length <= 0) {
      this.modal.error({
        nzTitle: '缺少订单！',
        nzContent: '请选择需要发货的订单...'
      });

      return;
    }

    if (data.filter(item => !item.deliveryCode).length > 0) {
      this.modal.error({
        nzTitle: '物流信息错误！',
        nzContent: '请选择物流公司...'
      });

      return;
    }

    this.weimobService.delivery(data).subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.modal.success({
          nzTitle: '发货成功！'
        });
      } else {
        const errorOrder: string[] = result.data;
        this.notification.create(
          'error',
          '以下订单发货失败, 请手动提交',
          errorOrder.join('<br>')
        );
      }
    });

  }

  changeDelivery(value: string, order: WeimobOrderData) {
    this.selectedOrder = null;
    if (this.weimobDelivery.filter(item => item.code === value).length > 0) {
      order.deliveryCom = this.weimobDelivery.filter(item => item.code === value)[0].com;
    }
  }

}
