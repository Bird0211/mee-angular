import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderUggComponent } from './order-ugg.component';
import { NzGridModule, NzIconModule, NzModalModule, NzResultModule, NzSkeletonModule, NzSpinModule, NzTableModule } from 'ng-zorro-antd';
import { OrderTableProductModule } from '../order-table/order-table-product/order-table-product.module';



@NgModule({
  declarations: [
    OrderUggComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzGridModule,
    NzTableModule,
    OrderTableProductModule,
    NzSpinModule,
    NzIconModule
  ],
  exports: [
    OrderUggComponent
  ],
  entryComponents: [
    OrderUggComponent
  ]
})
export class OrderUggModule { }
