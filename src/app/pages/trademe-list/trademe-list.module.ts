import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrademeListRoutingModule } from './trademe-list-routing.module';
import { TrademeListComponent } from './trademe-list.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSelectModule, NzButtonModule, NzIconModule, NzDividerModule, NzTableModule } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';


@NgModule({
  declarations: [TrademeListComponent],
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
    NzTableModule
  ]
})
export class TrademeListModule { }
