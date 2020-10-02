import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UggImportComponent } from './ugg-import.component';

const routes: Routes = [{ path: '', component: UggImportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UggImportRoutingModule { }
