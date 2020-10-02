import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UggProductComponent } from './ugg-product.component';

const routes: Routes = [{ path: '', component: UggProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UggProductRoutingModule { }
