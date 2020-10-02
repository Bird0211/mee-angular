import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTableComponent } from './order-table.component';
import { NzAffixModule, NzAvatarModule, NzCheckboxModule, NzGridModule, NzIconModule, NzListModule,
  NzPaginationModule,
    NzTableComponent, NzTableModule, NzToolTipModule, NzTypographyModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { OrderOptionsModule } from '../order-options/order-options.module';
import { OrderTableProductComponent } from './order-table-product/order-table-product.component';
import { OrderTableProductModule } from './order-table-product/order-table-product.module';



@NgModule({
  declarations: [
    OrderTableComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzListModule,
    NzGridModule,
    NzCheckboxModule,
    NzAvatarModule,
    NzTypographyModule,
    NzAffixModule,
    NzPaginationModule,
    FormsModule,
    NzToolTipModule,
    NzIconModule,
    OrderOptionsModule,
    OrderTableProductModule
  ],
  exports: [
    OrderTableComponent
  ]
})
export class OrderTableModule { }
