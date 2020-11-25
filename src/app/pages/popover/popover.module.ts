import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    PopoverComponent
  ],
  imports: [
    CommonModule,
    NzPopoverModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    NzIconModule
  ],
  exports: [
    PopoverComponent
  ]
})
export class PopoverModule { }
