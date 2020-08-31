import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NzpostConfigComponent } from './nzpost-config.component';

const routes: Routes = [{ path: '', component: NzpostConfigComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NzpostConfigRoutingModule { }
