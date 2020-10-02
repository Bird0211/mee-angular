import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeimobDeliveryRoutingModule } from './weimob-delivery-routing.module';
import { WeimobDeliveryComponent } from './weimob-delivery.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';


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
