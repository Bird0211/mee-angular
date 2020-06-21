import { Component, OnInit } from '@angular/core';
import { SimpleData, MeeResult, TotalData, NoshipData } from 'src/app/interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-data-total',
  templateUrl: './data-total.component.html',
  styleUrls: ['./data-total.component.less']
})
export class DataTotalComponent implements OnInit {

  totalDatas: SimpleData[] = new Array(4);

  loading = true;

  totalDataUrl: string;

  noShipUrl: string;

  constructor(private http: HttpClient,
              private authService: AuthService
    ) {
    this.totalDataUrl = environment.totalDataUrl;
    this.noShipUrl = environment.noShipUrl;
  }

  ngOnInit(): void {
    this.loadTotalData();
    this.loadNoShipData();
  }

  loadTotalData() {
    this.getTotalData().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.loading = false;
        const total: TotalData = result.data;
        this.totalDatas[0] = {
          image: 'icon-all1',
          value: total.totalNumber.toString(),
          name: '订单总数量',
          color: null
        };

        this.totalDatas[1] = {
          image: 'icon-yingshouzongjine',
          value: total.totalPrice.toString(),
          name: '订单总金额',
          color: null
        };
      }
    });

  }

  getTotalData() {
    const bizId = this.authService.getBizId();
    const url = this.totalDataUrl + '/' + bizId;
    return this.http.get(url);
  }

  loadNoShipData() {
    this.getNoshipData().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.loading = false;
        const total: NoshipData = result.data;
        this.totalDatas[2] = {
          image: 'icon-tian',
          value: total.noShipOrder.toString(),
          name: '7天内未发货订单',
          color: null
        };

        this.totalDatas[3] = {
          image: 'icon-yichang',
          value: total.errorOrder.toString(),
          name: '异常订单',
          color: 'red'
        };
      }
    });
  }

  getNoshipData() {
    const bizId = this.authService.getBizId();
    const url = this.noShipUrl + '/' + bizId;
    return this.http.get(url);
  }


}
