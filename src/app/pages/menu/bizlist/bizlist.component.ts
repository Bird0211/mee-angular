import { Component, OnInit } from '@angular/core';
import { BizData, MeeResult } from 'src/app/interface';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';
import { BizServiceService } from '../biz-service.service';

@Component({
  selector: 'app-bizlist',
  templateUrl: './bizlist.component.html',
  styleUrls: ['./bizlist.component.less']
})
export class BizlistComponent implements OnInit {
  bizdata: BizData[];
  activedBiz: BizData = {};

  bizUrl: string;
  addBizUrl: string;
  updateBizUrl: string;

  isVisible = false;
  isAdd = true;

  constructor(private http: HttpClient,
              private msg: NzMessageService,
              private bizSerice: BizServiceService
            ) {
    this.addBizUrl = environment.addBizUrl;
    this.updateBizUrl = environment.updateBizUrl;
  }

  ngOnInit(): void {
    this.bizSerice.loadBiz((meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
        this.bizdata = meeResult.data;
      }
    });
  }

  addBiz() {
    this.activedBiz = {};
    this.isVisible = true;
    this.isAdd = true;
  }

  editBiz(id: number) {
    this.isVisible = true;
    this.isAdd = false;
    this.activedBiz = this.bizdata.filter(item => item.id === id)[0];
  }

  cancel() {
    this.isVisible = false;
  }

  submit() {
    console.log(this.activedBiz);

    let url = null;
    if (this.isAdd) {
      url = this.addBizUrl;
    } else {
      url = this.updateBizUrl;
    }


    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        // 'Authorization': 'my-auth-token'
      })
    };

    const req = new HttpRequest('POST', url, this.activedBiz , httpOptions);
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (e: HttpResponse<MeeResult>) => {
          const response: MeeResult = e.body;

          if (response.statusCode === 0 && response.data != null) {
              const data = response.data;
              if (data) {
                this.msg.success('提交成功!');

                if (this.isAdd) {
                  this.bizdata = [...this.bizdata, this.activedBiz];

                } else {
                  this.bizdata.forEach((item, index) => {
                    if (item.id === data.id) {
                      this.bizdata[index] = data;
                    }
                  });
                }
                this.isVisible = false;
              } else {
                this.msg.error('提交失败!');
              }
          } else {
            this.msg.error('提交失败!');
          }
        },
        (e) => {
          console.log(e);
        }
      );
  }

}
