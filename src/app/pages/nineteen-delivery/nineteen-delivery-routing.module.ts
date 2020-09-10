import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NineteenDeliveryComponent } from './nineteen-delivery.component';

const routes: Routes = [{ path: '', component: NineteenDeliveryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NineteenDeliveryRoutingModule { }
