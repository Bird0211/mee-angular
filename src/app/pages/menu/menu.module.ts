import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    MenuRoutingModule,
    NgZorroAntdModule
  ],
  exports: [MenuComponent]
})

export class MenuModule {
}
