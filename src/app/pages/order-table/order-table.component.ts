import { Component, Input, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NestableSettings } from 'ngx-nestable/lib/nestable.models';
import { OrderInfo, OrderSource, TreeNode } from 'src/app/interface';
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
  splitVisible = false;

  public options = {
    fixedDepth: false,
    maxDepth: 2
  } as NestableSettings;

  public list: TreeNode[] = [];

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

  split(item: OrderInfo) {
    console.log(item);
    this.list = [];
    this.splitVisible = true;
    this.dataSet.filter((data: OrderInfo) => data.orderId.toString().split('-')[0] === item.orderId.toString().split('-')[0]).
      forEach(data => {
        const children: TreeNode[] =
          data.itemList.map(i => {
            const childNode: TreeNode = {
              orderId: data.orderId,
              title: i.itemName,
              number: i.num,
              $$expanded: true
            };
            return childNode;
          });
        const node: TreeNode = {
          orderId: data.orderId,
          $$expanded: true,
          children
        };

        this.list.push(node);
      });
  }

  isMerge(selectItem: OrderInfo) {
    if (!selectItem || !selectItem.address) {
      return false;
    }
    if (this.dataSet && this.dataSet.length > 0) {
      if (this.dataSet.filter(item => item.name && item.name === selectItem.name &&
          item.address === selectItem.address &&
          item.phone === selectItem.phone
        ).length > 1) {
        return true;
      }
    }

    return false;
  }

  marge(selectItem: OrderInfo) {
    if (!selectItem || !selectItem.address) {
      return false;
    }
    if (this.dataSet && this.dataSet.length > 0) {
      this.dataSet.filter(item => item.name && item.name === selectItem.name &&
        item.address === selectItem.address &&
        item.phone === selectItem.phone && item !== selectItem
        ).forEach(item => {
          selectItem.itemList.push(...item.itemList);
          selectItem.orderId = selectItem.orderId + (';' + item.orderId);
        });

      this.dataSet = this.dataSet.filter(item =>
        item.name !== selectItem.name &&
        item.address !== selectItem.address &&
        item.phone !== selectItem.phone || item === selectItem);
    }
  }

  splitOrder() {

  }

  cancelSplit() {
    this.splitVisible = false;
    // this.list = null;
  }

  dragNode(value) {
    console.log('Drag:' , value);
  }

  dropNode(value) {
    const item: TreeNode = value.item;
    console.log('List ', this.list);
    console.log('Drop:' , item);
    if (!value.destination || value.destination === null) {
      this.list.filter(i => !i.children).forEach(i =>
        {
          console.log(i);
        });
    }
    console.log('List Data: ', this.list);
  }

}
