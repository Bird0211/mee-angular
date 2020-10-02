import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UggImportRoutingModule } from './ugg-import-routing.module';
import { UggImportComponent } from './ugg-import.component';
import { NzcardModule } from '../nzcard/nzcard.module';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [UggImportComponent],
  imports: [
    CommonModule,
    UggImportRoutingModule,
    NzGridModule,
    NzcardModule,
  ]
})
export class UggImportModule { }
