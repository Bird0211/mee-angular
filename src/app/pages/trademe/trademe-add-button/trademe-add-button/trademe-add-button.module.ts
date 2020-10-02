import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrademeAddButtonComponent } from '../trademe-add-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';



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
