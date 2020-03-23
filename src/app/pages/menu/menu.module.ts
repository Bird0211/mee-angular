import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzcardComponent } from './nzcard/nzcard.component';
import { MenulistComponent } from './menulist/menulist.component';
import { FormsModule } from '@angular/forms';
import { BizmenuComponent } from './bizmenu/bizmenu.component';
import { BizlistComponent } from './bizlist/bizlist.component';
import { RolelistComponent } from './rolelist/rolelist.component';
import { RoleuserComponent } from './roleuser/roleuser.component';
import { MenutreeComponent } from './menutree/menutree.component';

@NgModule({
  declarations: [MenuComponent, NzcardComponent, MenulistComponent, BizmenuComponent,
    BizlistComponent, RolelistComponent, RoleuserComponent, MenutreeComponent  ],
  imports: [
    MenuRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    CommonModule
  ],
  exports: [MenuComponent ]
})

export class MenuModule {
}
