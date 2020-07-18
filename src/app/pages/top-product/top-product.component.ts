import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MeeResult, YiyunTopProduct, MeeProduct } from 'src/app/interface';
import { MeeProductService } from 'src/app/service/mee-product.service';

@Component({
  selector: 'app-top-product',
  templateUrl: './top-product.component.html',
  styleUrls: ['./top-product.component.less']
})
export class TopProductComponent implements OnInit, AfterViewInit {

  topProductURl: string;

  chartOption: EChartOption;

  sourceData = [];

  products: YiyunTopProduct[];

  constructor(private http: HttpClient,
              private authService: AuthService,
              private productService: MeeProductService
    ) {
    this.topProductURl = environment.topProductURl;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loadTopProduct();
  }

  loadTopProduct() {
    this.getTopProduct().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.products = result.data;
        this.loadMeeProduct(this.products.map(item => item.sku.trim()));
      }
    });
  }

  getTopProduct() {
    const url = this.topProductURl + '/' + this.authService.getBizId();
    return this.http.get(url);
  }


  setOptions() {
    if (!this.products) {
      return;
    }

    const topscore = this.products[0].number;
    this.sourceData.push(['score', 'amount', 'product']);
    for (const item of this.products.reverse()) {
      const data = [(item.number * 100 / topscore).toFixed(2) , item.number , item.productName];
      this.sourceData.push(data);
    }

    this.chartOption = {
      dataset: {
          source: this.sourceData
      },
      grid: {containLabel: true},
      xAxis: {name: 'amount'},
      yAxis: {
          type: 'category',
          show: false,
          splitLine: {show: false},
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel : {
            formatter: ''
          },
        },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
      },
      visualMap: [{
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 100,
          // text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          inRange: {
              color: ['#D7DA8B', '#E15457']
          },
          show: false
      }],
      series: [
          {
              type: 'bar',
              encode: {
                  // Map the "amount" column to X axis.
                  x: 'amount',
                  // Map the "product" column to Y axis
                  y: 'product'
              }
          }
      ]
    };
  }

  loadMeeProduct(skus: string[]) {
    this.productService.getProduct(skus).then((meeProduct: Map<string, MeeProduct>) => {
      this.products.forEach(item => item.productName = meeProduct[item.sku.trim()] ?  meeProduct[item.sku.trim()].chName : item.sku.trim());
      // this.sourceData.forEach(item => item[2] = meeProduct[item[2]] ? meeProduct[item[2]].chName : item[2]);
      this.setOptions();
    });
  }

}
