import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzpostConfigRoutingModule } from './nzpost-config-routing.module';
import { NzpostConfigComponent } from './nzpost-config.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';

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
