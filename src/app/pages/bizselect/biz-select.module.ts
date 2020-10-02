import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BizselectComponent } from './bizselect.component';
import { NzSelectModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [BizselectComponent],
  imports: [
    CommonModule,
    NzSelectModule,
    FormsModule
  ],
  exports: [
    BizselectComponent
  ]
})
export class BizSelectModule { }
