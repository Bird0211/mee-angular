import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NineteenDeliveryRoutingModule } from './nineteen-delivery-routing.module';
import { NineteenDeliveryComponent } from './nineteen-delivery.component';
import { NzSelectModule, NzDividerModule, NzDatePickerModule, NzIconModule, NzButtonModule, NzTableModule, NzCardModule, NzAvatarModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';


@NgModule({
  declarations: [NineteenDeliveryComponent],
  imports: [
    CommonModule,
    NineteenDeliveryRoutingModule,
    NzSelectModule,
    FormsModule,
    NzSpaceModule,
    NzDividerModule,
    NzDatePickerModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule,
    NzCardModule,
    NzAvatarModule
  ]
})
export class NineteenDeliveryModule { }
