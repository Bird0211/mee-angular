import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { InvoiceComponent } from '../../interface';


@Component({
  selector: 'app-invoice-result',
  templateUrl: './invoice-result.component.html',
  styleUrls: ['./invoice-result.component.less']
})
export class InvoiceResultComponent implements OnInit, InvoiceComponent {

  @Input() data: any;

  @Output() callback = new EventEmitter();

  status: string;

  constructor() { }

  ngOnInit() {
    this.status = 'error';
  }



}
