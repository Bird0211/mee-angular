import { Component, OnInit } from '@angular/core';
import { PlatformService } from 'src/app/service/platform.service';
import { PlatFormInfo, MeeResult, TradeMeSoltOrder } from 'src/app/interface';
import { NzModalService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-trademe-list',
  templateUrl: './trademe-list.component.html',
  styleUrls: ['./trademe-list.component.less']
})
export class TrademeListComponent implements OnInit {

  trademeInfos: PlatFormInfo[];

  store: number;

  filters = ['Last45Days', 'Last30Days', 'Last7Days', 'Last3Days', 'Last24Hours', 'LastHour'];

  filter: string;

  soldItemUrl: string;

  isLongding = false;

  orders: TradeMeSoltOrder[];

  constructor(
    private platformService: PlatformService,
    private modal: NzModalService,
    private http: HttpClient
  ) {
    this.soldItemUrl = environment.tradeMeSoldItemUrl;
  }

  ngOnInit(): void {
    this.filter = 'Last24Hours';
    this.loadTradeMeStore();
  }

  loadTradeMeStore() {
    this.platformService.loadPlatFormInfo('trademe').then((result: PlatFormInfo[]) => {
      this.trademeInfos = result;
      if (this.trademeInfos && this.trademeInfos.length > 0) {
        this.store = this.trademeInfos[0].id;
      }
    });
  }

  search() {
    if (!this.store) {
      this.modal.warning({
        nzTitle: 'Missing query conditions TradeMe Store',
        nzContent: 'Please select a TradeMe Store!'
      });
      return ;
    }

    if (!this.filter) {
      this.modal.warning({
        nzTitle: 'Missing query condition',
        nzContent: 'Please select a Filter Condition!'
      });
      return ;
    }

    this.postTrdeMe();
  }

  postTrdeMe() {
    this.isLongding = true;
    this.submitTradeMee().subscribe((result: MeeResult) => {
      this.isLongding = false;
      if (result.statusCode === 0) {
        this.orders = result.data;
      } else {
        this.modal.error({
          nzTitle: 'Search Error!',
          nzContent: result.description
        });
      }
    });
  }

  submitTradeMee() {
    const url = this.soldItemUrl + '/' + this.store;
    return this.http.post(url, {filter: this.filter});
  }

}
