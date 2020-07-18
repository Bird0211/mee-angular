import { Component, OnInit } from '@angular/core';
import { SimpleData, MeeResult, TotalData, NoshipData, ErrorData, DataStatistics } from 'src/app/interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd';

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

  errorOrderUrl: string;

  dataStaticUrl: string;

  refreshDataUrl: string;

  isSpin = false;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private messageService: NzMessageService
    ) {
    this.totalDataUrl = environment.totalDataUrl;
    this.noShipUrl = environment.noShipUrl;
    this.errorOrderUrl = environment.errorOrderUrl;
    this.dataStaticUrl = environment.dataStaticUrl;
    this.refreshDataUrl = environment.refreshDataUrl;
  }

  ngOnInit(): void {
    this.loadTotalData();
    this.loadDataStaticData();
    // this.loadNoShipData();
    // this.loadErrorData();
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

  loadDataStaticData() {
    this.getDataStaticData().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.loading = false;
        const data: DataStatistics = result.data;
        this.totalDatas[2] = {
          image: 'icon-tian',
          value: data.noShip.toString(),
          name: '7天内未发货订单',
          color: null
        };
        this.totalDatas[3] = {
          image: 'icon-yichang',
          value: data.error.toString(),
          name: '异常订单',
          color: 'red'
        };
      }
    });
  }

  getDataStaticData() {
    const bizId = this.authService.getBizId();
    const url = this.dataStaticUrl + '/' + bizId;
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
      }
    });
  }

  getNoshipData() {
    const bizId = this.authService.getBizId();
    const url = this.noShipUrl + '/' + bizId;
    return this.http.get(url);
  }

  loadErrorData() {
    this.getErrorData().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.loading = false;
        const total: ErrorData = result.data;
        this.totalDatas[3] = {
          image: 'icon-yichang',
          value: total.errorOrder.toString(),
          name: '异常订单',
          color: 'red'
        };
      }
    });
  }

  getErrorData() {
    const bizId = this.authService.getBizId();
    const url = this.errorOrderUrl + '/' + bizId;
    return this.http.get(url);
  }

  refreshData() {
    this.isSpin = true;
    this.putRefreshData().subscribe((result: MeeResult) => {
      this.isSpin = false;
      if (result.statusCode === 0) {
        this.messageService.success('刷新成功！');
        this.loadDataStaticData();
      } else {
        this.messageService.error('刷新成功！');
      }
    });
  }

  putRefreshData() {
    const bizId = this.authService.getBizId();
    const url = this.refreshDataUrl + '/' + bizId;
    return this.http.put(url, null);
  }

}
