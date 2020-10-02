import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTableComponent } from './order-table.component';
import { FormsModule } from '@angular/forms';
import { OrderOptionsModule } from '../order-options/order-options.module';
import { OrderTableProductModule } from './order-table-product/order-table-product.module';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTypographyModule } from 'ng-zorro-antd/typography';


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
