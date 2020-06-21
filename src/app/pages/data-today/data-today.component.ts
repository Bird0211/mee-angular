import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SimpleData, MeeResult, TodayData } from 'src/app/interface';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-today',
  templateUrl: './data-today.component.html',
  styleUrls: ['./data-today.component.less']
})
export class DataTodayComponent implements OnInit, AfterViewInit {

  todayDatas: SimpleData[] = new Array(4);

  loading = true;

  todayDataUrl: string;

  constructor(private authService: AuthService,
              private http: HttpClient
    ) {
    this.todayDataUrl = environment.todayDataUrl;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadTodayData();
  }

  loadTodayData() {
    this.getTodayData().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.loading = false;
        const todayData: TodayData = result.data;
        this.todayDatas = [
          {
            image: 'icon-maoyishangbianhao',
            value: todayData.totalNum.toString(),
            name: '订单数量',
            color: null
          },
          {
            image: 'icon-zongjine',
            value: todayData.totalPrice.toString(),
            name: '订单金额',
            color: null
          },
          {
            image: 'icon-weichuku',
            value: todayData.undeliveredNum.toString(),
            name: '待发货订单',
            color: null
          },
          {
            image: 'icon-yichuku',
            value: todayData.deliveredNum.toString(),
            name: '已发货订单',
            color: null
          },
        ];
      }
    });
  }

  getTodayData() {
    const url = this.todayDataUrl + '/' + this.authService.getBizId();
    return this.http.get(url);
  }

}
