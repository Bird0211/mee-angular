import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UggOrderRoutingModule } from './ugg-order-routing.module';
import { UggOrderComponent } from './ugg-order.component';
import { NzBadgeModule, NzButtonModule, NzDatePickerModule, NzDividerModule, NzGridModule, NzIconModule, NzInputModule, NzInputNumberModule, NzModalModule, NzPopoverModule, NzSelectModule, NzTableModule, NzTabsModule, NzToolTipModule } 
    from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { BizSelectModule } from '../bizselect/biz-select.module';
import { NzSpaceModule } from 'ng-zorro-antd/space';


@NgModule({
  declarations: [UggOrderComponent],
  imports: [
    CommonModule,
    UggOrderRoutingModule,
    NzModalModule,
    NzGridModule,
    NzTableModule,
    NzSelectModule,
    NzDatePickerModule,
    NzDividerModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    BizSelectModule,
    NzInputModule,
    NzTabsModule,
    NzBadgeModule,
    NzToolTipModule,
    NzSpaceModule,
    NzPopoverModule,
  ],
  exports: [
    UggOrderComponent
  ]
})
export class UggOrderModule { }
