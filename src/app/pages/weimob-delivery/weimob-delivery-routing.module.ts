import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeimobDeliveryComponent } from './weimob-delivery.component';

const routes: Routes = [{ path: '', component: WeimobDeliveryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeimobDeliveryRoutingModule { }
