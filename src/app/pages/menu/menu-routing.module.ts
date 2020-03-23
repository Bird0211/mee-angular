import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';
import { MenulistComponent } from './menulist/menulist.component';
import { BizmenuComponent } from './bizmenu/bizmenu.component';
import { BizlistComponent } from './bizlist/bizlist.component';
import { RolelistComponent } from './rolelist/rolelist.component';

const routes: Routes = [
  { path: ':bizid/:userid/:time/:nonce/:sign',
    component: MenuComponent,
    children:
      [{ path: 'list', component: MenulistComponent},
      { path: 'bizlist', component: BizlistComponent},
      { path: 'bizmenu', component: BizmenuComponent},
      { path: 'rolelist', component: RolelistComponent}]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MenuRoutingModule { }
