import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NineteenDeliveryRoutingModule } from './nineteen-delivery-routing.module';
import { NineteenDeliveryComponent } from './nineteen-delivery.component';
import { FormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

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
