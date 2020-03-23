import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import {
  trigger,
  state,
  style,
  animate,
  keyframes,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-invoice-index',
  templateUrl: './invoice-index.component.html',
  styleUrls: ['./invoice-index.component.less'],
  animations: [
    trigger('ocrExl', [
      state('open', style({
        color: '#2c9d5c'
      })),
      state('closed', style({
        color: 'rgba(0, 0, 0, 0.65)'
      })),
      transition('open <=> closed', [
        animate('0.5s')
      ])
    ]),
    trigger('ocrPdf', [
      state('open', style({
        color: '#e2373a'
      })),
      state('closed', style({
        color: 'rgba(0, 0, 0, 0.65)'
      })),
      transition('open <=> closed', [
        animate('0.5s')
      ])
    ]),
    trigger('ocrImg', [
      state('open', style({
        color: '#4e80f6'
      })),
      state('closed', style({
        color: 'rgba(0, 0, 0, 0.65)'
      })),
      transition('open <=> closed', [
        animate('1s')
      ])
    ]),
    trigger('changeImg', [
      state('open', style({
        display: 'block'
      })),
      state('closed', style({
        display: 'none'
      })),
      transition('open <=> closed', [
        animate('1s', keyframes ( [
          style({ opacity: 0.2, offset: 0.7 })
        ]))
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

  imgsrc = 'assets/image/exlguide.jpeg';

  images = ['assets/image/exlguide.jpeg',
            'assets/image/imgguide.jpeg',
            'assets/image/imgguide.jpeg'];

  isChangeImg1 = true;
  isChangeImg2 = false;
  isChangeImg3 = false;


  constructor(private iconService: NzIconService,
              private router: Router,
              private activedRoute: ActivatedRoute) {
    this.iconService.fetchFromIconfont({
      scriptUrl: environment.iconUrl
    });
  }

  ngOnInit() {
    this.paramInit();
  }

  paramInit() {
    this.bizid = this.activedRoute.snapshot.paramMap.get('bizid');
    this.time = this.activedRoute.snapshot.paramMap.get('time');
    this.nonce = this.activedRoute.snapshot.paramMap.get('nonce');
    this.sign = this.activedRoute.snapshot.paramMap.get('sign');
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
        this.isChangeImg1 = true;
        this.isChangeImg2 = false;
        this.isChangeImg3 = false;
        break;
      case 2:
        this.isExlOpen = false;
        this.isImgOPen = true;
        this.isPdfOpen = false;
        this.isChangeImg1 = false;
        this.isChangeImg2 = true;
        this.isChangeImg3 = false;
        break;
      case 3:
        this.isExlOpen = false;
        this.isImgOPen = false;
        this.isPdfOpen = true;
        this.isChangeImg1 = false;
        this.isChangeImg2 = false;
        this.isChangeImg3 = true;
        break;
    }

    this.imgsrc = this.images[item - 1];
  }

  hideHelp = (item: number) => {
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
