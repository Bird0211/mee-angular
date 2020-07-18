import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { MeeResult, OrderStatisticsData } from 'src/app/interface';
import { EChartOption } from 'echarts';
import { formatDate } from '@angular/common';

import * as echarts from 'echarts';

@Component({
  selector: 'app-data-order',
  templateUrl: './data-order.component.html',
  styleUrls: ['./data-order.component.less']
})
export class DataOrderComponent implements OnInit, AfterViewInit {

  orderDataUrl: string;

  orderDatas: OrderStatisticsData[];

  xAxisData: string[];

  orderNumber: number[];

  orderPrice: number[];

  chartOption: EChartOption;

  colors = ['#F08080', '#CD5C5C'];

  constructor(private authService: AuthService,
              private http: HttpClient
    ) {
    this.orderDataUrl = environment.orderDataUrl;
  }
  ngAfterViewInit(): void {
    this.loadOrderData();
  }

  ngOnInit(): void {
  }

  loadOrderData() {
    this.getOrderData().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.orderDatas = result.data;
        this.xAxisData = this.orderDatas.map(item => item.time);

        this.orderNumber = this.orderDatas.map(item => item.dataTotal.totalNumber);
        this.orderPrice = this.orderDatas.map(item => item.dataTotal.totalPrice);

        const maxNumber = Math.ceil(Math.max(...this.orderNumber) * 1.1);
        const maxPrice = Math.ceil(Math.max(...this.orderPrice) * 1.1);

        const numberInterval = Math.ceil(maxNumber / 5);
        const priceInterval = Math.ceil(maxPrice / 5);

        this.chartOption = {
          color: this.colors,
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          legend: {
              data: ['订单数量', '订单金额']
          },
          xAxis: [
              {
                  type: 'category',
                  data: this.xAxisData,
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '订单数量',
                  min: 0,
                  max: maxNumber,
                  interval: numberInterval,
                  axisLabel: {
                      formatter: '{value}'
                  }
              },
              {
                  type: 'value',
                  name: '订单金额',
                  min: 0,
                  max: maxPrice,
                  interval: priceInterval,
                  axisLabel: {
                      formatter: '{value} '
                  }
              }
          ],
          series: [
              {
                  name: '订单数量',
                  type: 'bar',
                  data: this.orderNumber
              },
              {
                  name: '订单金额',
                  type: 'line',
                  yAxisIndex: 1,
                  data: this.orderPrice
              }
          ]
        };
      }
    });
  }

  getOrderData() {
    const url = this.orderDataUrl + '/' + this.authService.getBizId();
    const from = new Date();
    const to = new Date();
    const data = {
      from: from.setDate(from.getDate() - 8),
      to: to.setDate(to.getDate() - 1),
    };
    return this.http.post(url, data);
  }

}
