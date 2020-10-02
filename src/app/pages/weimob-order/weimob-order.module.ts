import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeimobOrderRoutingModule } from './weimob-order-routing.module';
import { WeimobOrderComponent } from './weimob-order.component';
import { FormsModule } from '@angular/forms';
import { OrderTableModule } from '../order-table/order-table.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [WeimobOrderComponent],
  imports: [
    CommonModule,
    WeimobOrderRoutingModule,
    NzGridModule,
    NzDatePickerModule,
    FormsModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    OrderTableModule
  ]
})
export class WeimobOrderModule { }
