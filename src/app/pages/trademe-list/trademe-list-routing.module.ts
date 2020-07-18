import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrademeListComponent } from './trademe-list.component';

const routes: Routes = [{ path: '', component: TrademeListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrademeListRoutingModule { }
