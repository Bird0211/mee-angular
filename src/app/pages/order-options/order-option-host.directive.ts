import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appOrderOptionHost]'
})
export class OrderOptionHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
