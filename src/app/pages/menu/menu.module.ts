import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzcardComponent } from './nzcard/nzcard.component';

@NgModule({
  declarations: [MenuComponent, NzcardComponent  ],
  imports: [
    MenuRoutingModule,
    NgZorroAntdModule,
    CommonModule
  ],
  exports: [MenuComponent ]
})

export class MenuModule {
}
