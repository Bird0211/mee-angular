import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderInfo, OrderOptionComponent, OrderSource, UggOrder } from 'src/app/interface';
import { UggService } from 'src/app/service/ugg.service';

@Component({
  selector: 'app-order-ugg',
  templateUrl: './order-ugg.component.html',
  styleUrls: ['./order-ugg.component.less']
})

export class OrderUggComponent implements OnInit, OrderOptionComponent {

  constructor(private uggService: UggService,
              private router: Router
    ) { }
  @Input() bizId: number;
  @Input() orderSource: OrderSource;
  @Input() data: OrderInfo[];

  @Output() callback = new EventEmitter();

  successIds = new Set<string>();
  failIds = new Set<string>();

  isLoading = true;
  title = 'UGG订单';
  resultTitle = 'UGG订单处理成功!';
  subTitle = '点击预处理按钮, 编辑UGG订单';

  isVisible = false;
  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.isVisible = true;
      setTimeout(() => this.save(), 1000);
    }
  }

  save() {
    this.data.forEach(item => {
      item.itemList.forEach(i => {
        const uggOrder: UggOrder = {
          extId: item.orderId,
          productName: i.itemName,
          qty: i.num,
          bizId: this.bizId,
          resource: this.orderSource,
          imageUrl: i.image,
          receiveName: item.name,
          receivePhone: item.phone,
          receiveAddress: item.address,
          productSku: i.sku
        };

        this.uggService.saveOrder(uggOrder).subscribe((result: boolean) => {
          if (result) {
            this.successIds.add(item.orderId);
          } else {
            this.failIds.add(item.orderId);
          }
        }, () => this.failIds.add(item.orderId));
      });
    });
  }


  next() {
    console.log('Ugg-Order');
    this.router.navigate(['welcome'], {skipLocationChange: true});
    // this.router.navigateByUrl('ugg/order');
  }
}
