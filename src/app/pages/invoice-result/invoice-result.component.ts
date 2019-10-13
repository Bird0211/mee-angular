import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { InvoiceComponent, MeeResult } from '../../interface';


@Component({
  selector: 'app-invoice-result',
  templateUrl: './invoice-result.component.html',
  styleUrls: ['./invoice-result.component.less']
})
export class InvoiceResultComponent implements OnInit, InvoiceComponent {

  @Input() data: MeeResult;

  @Output() callback = new EventEmitter();

  status: string;

  title: string;

  subTitle: string;

  hint: string;

  desc: string;

  listOfData: any[] = [];


  constructor() { }

  ngOnInit() {
    if (this.data && this.data.statusCode === 0) {
        this.status = 'success';
        this.title = 'Submission Success';
        this.subTitle = '';
        this.listOfData = this.data.data;
    } else {
      this.status = 'error';
      this.title = 'Submission Failed';
      this.subTitle = '更新失败，请检查发票内容';
      this.hint = '您提交的内容有以下错误:';
      this.desc = this.data.data;
    }
  }



}
