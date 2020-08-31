import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TradeMeSoltOrder } from 'src/app/interface';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.less']
})
export class EmailSentComponent implements OnInit {

  @Input() orders: TradeMeSoltOrder[];

  @Output() selectItems: EventEmitter<number[]> = new EventEmitter();

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

    this.selectItems.emit(Array.from( this.setOfCheckedId ));
  }

}
