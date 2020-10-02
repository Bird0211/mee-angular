import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardInfo } from 'src/app/interface';

@Component({
  selector: 'app-ugg-import',
  templateUrl: './ugg-import.component.html',
  styleUrls: ['./ugg-import.component.less']
})
export class UggImportComponent implements OnInit {

  constructor(private router: Router) { }

  cardInfos: CardInfo[];

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.cardInfos = [{
      title: '微盟订单',
      description: '导入微盟订单',
      icon: 'icon-weimob',
      iconColor: '#35a9db',
      url: 'weimob/order'
    }];
  }

  jump(url: string) {
    this.router.navigate([url], {skipLocationChange: true});
  }
}
