import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UggSettingRoutingModule } from './ugg-setting-routing.module';
import { UggSettingComponent } from './ugg-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';


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
