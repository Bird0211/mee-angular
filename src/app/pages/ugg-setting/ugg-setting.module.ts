import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UggSettingRoutingModule } from './ugg-setting-routing.module';
import { UggSettingComponent } from './ugg-setting.component';
import { NzButtonModule, NzFormModule, NzInputModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UggSettingComponent],
  imports: [
    CommonModule,
    UggSettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class UggSettingModule { }
