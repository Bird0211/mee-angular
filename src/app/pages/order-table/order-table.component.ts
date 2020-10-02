import { Component, Input, OnInit } from '@angular/core';
import { OrderInfo, OrderSource } from 'src/app/interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.less']
})
export class OrderTableComponent implements OnInit {

  @Input() dataSet: OrderInfo[];
  @Input() pageIndex: number | 1;
  @Input() pageSize: number | 20;
  @Input() total: number;
  @Input() orderSource: OrderSource;

  bizId: number;

  selectData: OrderInfo[];

  allChecked = false;
  indeterminate = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.bizId = this.authService.getBizId();
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.dataSet = this.dataSet.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.dataSet = this.dataSet.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }

    this.selectData = this.dataSet.filter(item => item.checked);
  }

  updateSingleChecked(): void {
    if (this.dataSet.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.dataSet.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
    this.selectData = this.dataSet.filter(item => item.checked);
  }

  pageIndexChange(value: number) {
    this.pageIndex = value;
  }

}
