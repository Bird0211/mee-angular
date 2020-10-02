import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UggProductRoutingModule } from './ugg-product-routing.module';
import { UggProductComponent } from './ugg-product.component';


@NgModule({
  declarations: [UggProductComponent],
  imports: [
    CommonModule,
    UggProductRoutingModule
  ]
})
export class UggProductModule { }
