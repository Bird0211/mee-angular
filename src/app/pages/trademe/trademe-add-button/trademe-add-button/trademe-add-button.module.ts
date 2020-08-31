import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrademeAddButtonComponent } from '../trademe-add-button.component';
import { NzButtonModule, NzIconModule, NzToolTipModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [
    TrademeAddButtonComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule
  ],
  exports: [
    TrademeAddButtonComponent
  ]
})
export class TrademeAddButtonModule { }
