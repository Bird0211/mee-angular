import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UggOrderRoutingModule } from './ugg-order-routing.module';
import { UggOrderComponent } from './ugg-order.component';
import { FormsModule } from '@angular/forms';
import { BizSelectModule } from '../bizselect/biz-select.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopoverModule } from 'ng-zorro-antd/popover';


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
