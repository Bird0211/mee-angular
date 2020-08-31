import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrademeListRoutingModule } from './trademe-list-routing.module';
import { TrademeListComponent } from './trademe-list.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSelectModule, NzButtonModule, NzIconModule, NzDividerModule,
         NzTableModule, NzTabsModule, NzBadgeModule, NzToolTipModule,
         NzCardModule, NzAvatarModule, NzGridModule, NzEmptyModule, NzDropDownModule, NzInputModule, NzFormModule, NzInputNumberModule, NzTypographyModule, NzCheckboxModule } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { PaymentReceivedComponent } from './payment-received/payment-received.component';
import { GoodsShippedComponent } from './goods-shipped/goods-shipped.component';
import { SaleCompletedComponent } from './sale-completed/sale-completed.component';
import { TrademeAddButtonModule } from '../trademe/trademe-add-button/trademe-add-button/trademe-add-button.module';


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
