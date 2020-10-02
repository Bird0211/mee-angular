import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTableComponent } from '../order-table.component';
import { NzAvatarModule, NzGridModule, NzToolTipModule, NzTypographyModule } from 'ng-zorro-antd';
import { OrderTableProductComponent } from './order-table-product.component';



@NgModule({
  declarations: [
    OrderTableProductComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    NzAvatarModule,
    NzTypographyModule,
    NzToolTipModule
  ],
  exports: [
    OrderTableProductComponent
  ]
})
export class OrderTableProductModule { }
