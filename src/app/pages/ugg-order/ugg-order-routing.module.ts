import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UggOrderComponent } from './ugg-order.component';

const routes: Routes = [{ path: '', component: UggOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UggOrderRoutingModule { }
