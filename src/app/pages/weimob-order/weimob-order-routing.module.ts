import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeimobOrderComponent } from './weimob-order.component';

const routes: Routes = [{ path: '', component: WeimobOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeimobOrderRoutingModule { }
