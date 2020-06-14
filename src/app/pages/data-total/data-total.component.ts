import { Component, OnInit } from '@angular/core';
import { SimpleData } from 'src/app/interface';

@Component({
  selector: 'app-data-total',
  templateUrl: './data-total.component.html',
  styleUrls: ['./data-total.component.less']
})
export class DataTotalComponent implements OnInit {

  totalDatas: SimpleData[];

  loading = true;

  constructor() { }

  ngOnInit(): void {
    this.loadTotalData();
  }

  loadTotalData() {
    this.totalDatas = [{
      image: 'https://www.logolynx.com/images/logolynx/f2/f255362acd4081d6df559b91baefd356.jpeg',
      value: '1000',
      name: '订单数据'
    },
    {
      image: 'https://www.logolynx.com/images/logolynx/f2/f255362acd4081d6df559b91baefd356.jpeg',
      value: '1000',
      name: '订单数据'
    },
    {
      image: 'https://www.logolynx.com/images/logolynx/f2/f255362acd4081d6df559b91baefd356.jpeg',
      value: '1000',
      name: '订单数据'
    },
    {
      image: 'https://www.logolynx.com/images/logolynx/f2/f255362acd4081d6df559b91baefd356.jpeg',
      value: '1000',
      name: '订单数据'
    }
  ];
  }


}
