import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderOptionsComponent } from './order-options.component';
import { OrderOptionHostDirective } from './order-option-host.directive';
import { FormsModule } from '@angular/forms';
import { OrderUggModule } from '../order-ugg/order-ugg.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';


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
