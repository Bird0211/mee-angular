import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BizServiceService } from '../biz-service.service';
import { MeeResult, BizMenu, BizData } from 'src/app/interface';

@Component({
  selector: 'app-bizselect',
  templateUrl: './bizselect.component.html',
  styleUrls: ['./bizselect.component.less']
})
export class BizselectComponent implements OnInit {


  @Input() selectBiz: string;

  @Output() selectBizChange: EventEmitter<string> = new EventEmitter();

  @Output() changeValue = new EventEmitter<string>();


  bizData: BizData[];

  selectedNodes: string[];

  constructor(private bizService: BizServiceService) { }

  ngOnInit(): void {
    this.loadAllBiz();
  }

  loadAllBiz() {
    this.bizService.loadBiz((meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
          this.bizData = meeResult.data;
      }
    });
  }

  loadBizMenu(value: string): void {
    this.selectBizChange.emit(value);
    this.changeValue.emit(value);
  }

}
