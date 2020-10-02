import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrademeListRoutingModule } from './trademe-list-routing.module';
import { TrademeListComponent } from './trademe-list.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { PaymentReceivedComponent } from './payment-received/payment-received.component';
import { GoodsShippedComponent } from './goods-shipped/goods-shipped.component';
import { SaleCompletedComponent } from './sale-completed/sale-completed.component';
import { TrademeAddButtonModule } from '../trademe/trademe-add-button/trademe-add-button/trademe-add-button.module';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';


@NgModule({
  declarations: [
    TrademeListComponent,
    EmailSentComponent,
    PaymentReceivedComponent,
    GoodsShippedComponent,
    SaleCompletedComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    TrademeListRoutingModule,
    NzSpaceModule,
    NzSelectModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    NzTableModule,
    NzTabsModule,
    NzBadgeModule,
    NzToolTipModule,
    NzCardModule,
    NzAvatarModule,
    NzGridModule,
    NzEmptyModule,
    NzFormModule,
    TrademeAddButtonModule,
    NzDropDownModule,
    NzInputModule,
    NzInputNumberModule,
    NzTypographyModule,
    NzCheckboxModule
  ]
})
export class TrademeListModule { }
