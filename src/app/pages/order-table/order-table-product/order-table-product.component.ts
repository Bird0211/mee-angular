import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interface';

@Component({
  selector: 'app-order-table-product',
  templateUrl: './order-table-product.component.html',
  styleUrls: ['./order-table-product.component.less']
})
export class OrderTableProductComponent implements OnInit {

  @Input() products: Item[];

  max = 4;

  showTitle = '查看更多';

  constructor() { }

  ngOnInit(): void {
    if (this.products.length > 4) {
      this.showTitle = '点击查看剩余' + (this.products.length - 4) + '件商品';
    }
  }

  show() {
    if (this.showTitle !== '点击收起') {
      this.max = this.products.length;
      this.showTitle = '点击收起';
    } else {
      this.max = 4;
      this.showTitle = '点击查看剩余' + (this.products.length - 4) + '件商品';
    }
  }

}
