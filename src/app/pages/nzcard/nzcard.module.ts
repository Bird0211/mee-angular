import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './nzcard.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';



@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzIconModule
  ],
  exports: [
    CardComponent
  ]
})
export class NzcardModule { }
