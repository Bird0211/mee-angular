import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzpostConfigRoutingModule } from './nzpost-config-routing.module';
import { NzpostConfigComponent } from './nzpost-config.component';
import { NzButtonModule, NzTableModule, NzModalModule, NzFormModule, NzInputModule, NzIconModule, NzToolTipModule, NzDividerModule } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NzpostConfigComponent],
  imports: [
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzpostConfigRoutingModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzToolTipModule,
    NzDividerModule
  ]
})
export class NzpostConfigModule { }
