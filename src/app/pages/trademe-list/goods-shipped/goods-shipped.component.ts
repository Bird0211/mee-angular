import { Component, OnInit, Input } from '@angular/core';
import { TradeMeSoltOrder } from 'src/app/interface';

@Component({
  selector: 'app-goods-shipped',
  templateUrl: './goods-shipped.component.html',
  styleUrls: ['./goods-shipped.component.less']
})
export class GoodsShippedComponent implements OnInit {

  @Input() orders: TradeMeSoltOrder[];

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();

  constructor() { }

  ngOnInit(): void {
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.orders.forEach(item => this.updateCheckedSet(item.purchaseId, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: TradeMeSoltOrder[]): void {
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.orders.every(item => this.setOfCheckedId.has(item.purchaseId));
    this.indeterminate = this.orders.some(item => this.setOfCheckedId.has(item.purchaseId)) && !this.checked;
  }

}
