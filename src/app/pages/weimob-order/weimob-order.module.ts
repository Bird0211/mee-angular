import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeimobOrderRoutingModule } from './weimob-order-routing.module';
import { WeimobOrderComponent } from './weimob-order.component';
import { NzButtonModule, NzDatePickerModule, NzDividerModule, NzGridModule, NzIconModule, NzSelectModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { OrderTableModule } from '../order-table/order-table.module';


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
