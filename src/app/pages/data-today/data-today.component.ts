import { Component, OnInit } from '@angular/core';
import { SimpleData } from 'src/app/interface';

@Component({
  selector: 'app-data-today',
  templateUrl: './data-today.component.html',
  styleUrls: ['./data-today.component.less']
})
export class DataTodayComponent implements OnInit {

  todayDatas: SimpleData[];

  loading = true;

  constructor() { }

  ngOnInit(): void {
    this.loadTodayData();
  }

  loadTodayData() {
    this.todayDatas = [{
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
