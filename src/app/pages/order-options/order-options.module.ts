import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderOptionsComponent } from './order-options.component';
import { NzAffixModule, NzAnchorModule, NzButtonModule, NzGridModule, NzIconModule, NzModalModule, NzToolTipModule } from 'ng-zorro-antd';
import { OrderOptionHostDirective } from './order-option-host.directive';
import { FormsModule } from '@angular/forms';
import { OrderUggModule } from '../order-ugg/order-ugg.module';



@NgModule({
  declarations: [
    OrderOptionsComponent,
    OrderOptionHostDirective
  ],
  imports: [
    CommonModule,
    NzGridModule,
    NzAffixModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    NzModalModule,
    FormsModule,
    NzAnchorModule,
    OrderUggModule
  ],
  exports: [
    OrderOptionsComponent
  ]
})
export class OrderOptionsModule { }
