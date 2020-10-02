import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UggSettingComponent } from './ugg-setting.component';

const routes: Routes = [{ path: '', component: UggSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UggSettingRoutingModule { }
