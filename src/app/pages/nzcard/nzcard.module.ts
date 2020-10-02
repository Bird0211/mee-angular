import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './nzcard.component';
import { NzCardModule, NzIconModule } from 'ng-zorro-antd';



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
