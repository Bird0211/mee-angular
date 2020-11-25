import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderUggComponent } from './order-ugg.component';
import { OrderTableProductModule } from '../order-table/order-table-product/order-table-product.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';


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
    NzIconModule,
    NzButtonModule
  ],
  exports: [
    OrderUggComponent
  ],
  entryComponents: [
    OrderUggComponent
  ]
})
export class OrderUggModule { }
