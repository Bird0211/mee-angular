import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-invoice-index',
  templateUrl: './invoice-index.component.html',
  styleUrls: ['./invoice-index.component.less'],
  animations: [
    trigger('changeExl', [
      state('open', style({
        color: '#2c9d5c'
      })),
      state('closed', style({
        color: 'rgba(0, 0, 0, 0.65)'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ]),
    trigger('changePdf', [
      state('open', style({
        color: '#e2373a'
      })),
      state('closed', style({
        color: 'rgba(0, 0, 0, 0.65)'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ]),
    trigger('changeImg', [
      state('open', style({
        color: '#4e80f6'
      })),
      state('closed', style({
        color: 'rgba(0, 0, 0, 0.65)'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class InvoiceIndexComponent implements OnInit {

  bizid: string; time: string; nonce: string; sign: string;

  isActive = false;

  isExlOpen = false;

  isPdfOpen = false;

  isImgOPen = false;

  constructor(private iconService: NzIconService,
              private router: Router,
              private route: ActivatedRoute) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_1644348_b5epqdfmc9.js'
    });
  }

  ngOnInit() {
    this.paramInit();
  }

  paramInit() {
    this.bizid = this.route.snapshot.paramMap.get('bizid');
    this.time = this.route.snapshot.paramMap.get('time');
    this.nonce = this.route.snapshot.paramMap.get('nonce');
    this.sign = this.route.snapshot.paramMap.get('sign');
  }

  goInvoiceOcr = () => {
    this.router.navigateByUrl('invoice/' + this.bizid + '/' + this.time + '/' + this.nonce + '/' + this.sign);
  }

  showHelp = (item: number) => {
    this.isActive = true;
    switch (item) {
      case 1:
        this.isExlOpen = true;
        this.isImgOPen = false;
        this.isPdfOpen = false;
        break;

      case 2:
        this.isExlOpen = false;
        this.isImgOPen = true;
        this.isPdfOpen = false;
        break;

      case 3:
        this.isExlOpen = false;
        this.isImgOPen = false;
        this.isPdfOpen = true;
        break;
    }
  }

  hideHelp = (item: number) => {
    this.isActive = false;
    switch (item) {
      case 1:
        this.isExlOpen = false;
        break;

      case 2:
        this.isImgOPen = false;
        break;

      case 3:
        this.isPdfOpen = false;
        break;
    }
  }

}
