import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeimobDeliveryRoutingModule } from './weimob-delivery-routing.module';
import { WeimobDeliveryComponent } from './weimob-delivery.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDatePickerModule, NzButtonModule, NzIconModule, NzDividerModule, 
          NzTableModule, NzCardModule, NzAvatarModule, NzSelectModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [WeimobDeliveryComponent],
  imports: [
    CommonModule,
    WeimobDeliveryRoutingModule,
    NzSpaceModule,
    NzDatePickerModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    NzTableModule,
    NzCardModule,
    NzAvatarModule,
    NzSelectModule
  ]
})
export class WeimobDeliveryModule { }
