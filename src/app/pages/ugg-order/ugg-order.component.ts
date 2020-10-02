import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { pageUggOrder, UggDetail, UggOrder, UggOrderCount, UggQueryOrderParams } from 'src/app/interface';
import { OrderService } from 'src/app/service/order.service';
import { UggService } from 'src/app/service/ugg.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ugg-order',
  templateUrl: './ugg-order.component.html',
  styleUrls: ['./ugg-order.component.less']
})
export class UggOrderComponent implements OnInit {

  dateRange: Date[] = [];

  isLoading = false;

  orderResource: string[];

  resource: string;

  selectBiz: string;

  orderId: number;

  batchId: string;

  preorderCount: number;

  prepayCount: number;

  payCount: number;

  deliveryCount: number;

  status: number;

  pageIndex = 1;

  pageSize = 20;

  orders: UggOrder[];

  total: number;

  selectedIndex: number;

  selectedOrderId: string;
  selectCol: string;

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  settlePrice: number;
  popVisible = false;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private uggService: UggService,
              private modal: NzModalService
    ) { }

  ngOnInit(): void {
    this.orderResource = this.orderService.getOrderResource();
    this.initParam();
    this.search();
    this.count();
  }

  initParam() {
    const now = new Date();
    this.selectBiz = this.authService.getBizId().toString();
    this.dateRange = [new Date(now.getTime() - 7 * 24 * 3600 * 1000), now];
    this.resource = this.orderResource[0];
    this.status = 1;
  }

  search() {
    const param: UggQueryOrderParams = this.getParams();
    this.isLoading = true;
    this.uggService.searchOrder(param, this.pageIndex, this.pageSize).subscribe((result: pageUggOrder) => {
      this.orders = result.orders;
      this.total = result.total;
      this.pageIndex = result.pageIndex;
      this.pageSize = result.pageSize;
      this.isLoading = false;
    });
  }

  count() {
    this.preorderCount = 0;
    this.prepayCount = 0;
    this.payCount = 0;
    this.deliveryCount = 0;

    const param: UggQueryOrderParams = this.getParams();
    this.uggService.getOrderCount(param).subscribe((result: UggOrderCount[]) => {
      result.forEach((item: UggOrderCount) => {
        if (item.status === 1) {
          this.preorderCount = item.orderCount;
        } else if (item.status === 2) {
          this.prepayCount = item.orderCount;
        } else if (item.status === 3) {
          this.payCount = item.orderCount;
        } else if (item.status === 4 ) {
          this.deliveryCount = item.orderCount;
        }
      });
    });
  }

  private getParams(): UggQueryOrderParams {
    let start: Date = null;
    let end: Date = null;
    if (this.dateRange && this.dateRange.length === 2) {
      start = this.dateRange[0];
      start.setHours(0, 0, 0, 0);
      end = this.dateRange[1];
      end.setHours(23, 59 , 59, 59);
    }
    const param: UggQueryOrderParams = {
      bizId: Number(this.selectBiz),
      resource: this.resource,
      start: start.getTime(),
      end: end.getTime(),
      status: this.status,
      extId: this.orderId ? this.orderId.toString() : null,
      batchId: this.batchId
    };

    return param;
  }

  indexChange(index: number) {
    this.selectedIndex = index;
    this.status = index + 1;
    this.pageIndex = 1;
    this.search();
  }

  pageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.search();
  }

  getData() {
    this.pageIndex = 1;
    this.search();
    this.count();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.orders.every(({ extId }) => this.setOfCheckedId.has(extId));
    this.indeterminate = this.orders.some(({ extId }) => this.setOfCheckedId.has(extId)) && !this.checked;
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.orders.forEach((item) => this.updateCheckedSet(item.extId, checked));
    this.refreshCheckedStatus();
  }

  settle() {

    const data = this.orders.filter(item => this.setOfCheckedId.has(item.extId));
    if (data.length <= 0) {
      this.modal.error({
        nzTitle: '缺少订单',
        nzContent: '请选择需要结算的订单！'
      });
      return;
    }

    if (data.filter(item => !item.settlementPrice || item.settlementPrice === 0)) {
      this.modal.error({
        nzTitle: '订单缺少结算金额',
        nzContent: '请设置订单的结算金额！'
      });
      return;
    }


  }

  refresh(data: UggOrder) {
    if (!data.productSku) {
      this.modal.error({
        nzTitle: '缺少SKU编码',
        nzContent: '请设置订单的商品编码(SKU)！'
      });
      return ;
    }

    this.selectedOrderId = data.extId;
    this.selectCol = 'price';
    this.uggService.getOrderDetailBySKU(data.productSku).subscribe((result: UggDetail) => {
      data.price = result.price;
      this.selectedOrderId = null;
      this.selectCol = null;
    }, () => {
      this.modal.error({
        nzTitle: '查询失败',
        nzContent: '请确认SKU是否正确！'
      });
      this.selectedOrderId = null;
      this.selectCol = null;
    });
  }

  setSku(data: UggOrder) {
    this.selectedOrderId = null;
    this.selectCol = null;
  }

  selectSkuItem(data: UggOrder) {
    this.selectedOrderId = data.extId;
    this.selectCol = 'sku';
  }

}
