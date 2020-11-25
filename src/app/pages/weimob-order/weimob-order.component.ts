import { Component, OnInit } from '@angular/core';
import { Item, OrderInfo, OrderSource, WeimobItemVo, WeimobOrder, WeimobOrderListReq, WeimobOrderListResponse } from 'src/app/interface';
import { WeimobService } from 'src/app/service/weimob.service';

@Component({
  selector: 'app-weimob-order',
  templateUrl: './weimob-order.component.html',
  styleUrls: ['./weimob-order.component.less']
})
export class WeimobOrderComponent implements OnInit {

  dateRange = [];

  sendAddress: string;

  orderStatus: string;

  orderType: string;

  orderFlag: string;

  isLoading = false;

  pageNum = 1;

  pageSize = 20;

  total: number;

  weimboOrderResp: WeimobOrderListResponse;

  data: OrderInfo[];

  orderSource: OrderSource = 'weimob';

  constructor(private weimobService: WeimobService) { }

  ngOnInit(): void {
    this.initParam();
    this.search();
  }

  initParam() {
    const now = new Date();
    this.dateRange = [new Date(now.getTime() - 7 * 24 * 3600 * 1000), now];
    this.sendAddress = '1';
    this.orderStatus = '1';
    this.orderType = '1';
    this.orderFlag = '0';
  }

  search() {
    this.isLoading = true;

    const start: Date = this.dateRange[0];
    start.setHours(0, 0, 0, 0);
    const end: Date = this.dateRange[1];
    end.setHours(23, 59 , 59, 59);

    const param: WeimobOrderListReq = {
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      createStartTime: start.getTime(),
      createEndTime: end.getTime(),
      orderStatuses: this.orderStatus ? this.orderStatus : '',
      orderType: this.orderType ? this.orderType : '',  // 0:奶粉;1:其他
      sendarea: this.sendAddress ? this.sendAddress : '',
      flagRanks: this.orderFlag ? this.orderFlag : ''
    };

    this.weimobService.loadOrderList(param).subscribe(result => {
      this.weimboOrderResp = result;
      if (result.items) {
        this.total = result.totalCount;
        this.data = result.items.map((item: WeimobOrder) => {
          const params: OrderInfo = {
            orderId: item.orderNo,
            address: item.address,        // 收件人地址
            phone: item.phone,          // 收件人电话
            name: item.name,           // 收件人
            idCardNo: item.idCardNo,       // 身份证号
            totalNum: item.num,       // 总数量
            expressId: null,      // 物流单号
            expressName: null,    // 物流公司
            expressCode: null,    // 物流公司编码
            remark: null,         // 备注
            itemList: this.getItem(item.items)
          };
          return params;
        });
      }
      this.isLoading = false;
    });
  }

  getItem(weimobItems: WeimobItemVo[]): Item[] {
    if (!weimobItems || weimobItems.length <= 0) {
      return null;
    }

    const items: Item[] = weimobItems.map((item: WeimobItemVo) => {
      const data: Item = {
        sku: item.sku,
        image: item.imageUrl,
        itemName: item.itemName,
        num: item.num
      };
      return data;
    });

    return items;
  }

}
