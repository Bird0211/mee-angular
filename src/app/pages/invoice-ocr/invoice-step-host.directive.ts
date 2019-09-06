import { Directive , ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInvoiceStepHost]'
})
export class InvoiceStepHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
