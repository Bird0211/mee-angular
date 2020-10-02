import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTableComponent } from '../order-table.component';
import { OrderTableProductComponent } from './order-table-product.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';



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
