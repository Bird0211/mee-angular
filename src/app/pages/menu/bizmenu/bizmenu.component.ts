import { Component, OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BizData, MeeResult, Menu, BizMenu } from 'src/app/interface';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NzMessageService, isTemplateRef, NzTreeNodeOptions, NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd';
import { BizServiceService } from '../biz-service.service';


@Component({
  selector: 'app-bizmenu',
  templateUrl: './bizmenu.component.html',
  styleUrls: ['./bizmenu.component.less']
})
export class BizmenuComponent implements OnInit {

  selectBiz: string;

  bizData: BizData[];

  editBizMenuUrl: string;

  selectedNodes: string[];

  isloading = false;

  constructor(private http: HttpClient,
              private msg: NzMessageService,
              private bizService: BizServiceService,
              ) {
        this.editBizMenuUrl = environment.editBizMenuUrl;
  }

  ngOnInit(): void {
    this.loadAllBiz();
  }

  loadAllBiz() {
    this.bizService.loadBiz((meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
          this.bizData = meeResult.data;
      }
    });
  }

  loadBizMenu(value): void {
    this.bizService.loadBizMenu(value.toString(), (meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
        const bizMenu: BizMenu[] = meeResult.data;
        this.selectedNodes = bizMenu.map( item => item.menuId.toString());
      }
    });
  }

  saveBizMenu() {
    if (this.selectBiz == null) {
      this.msg.error('请选择商家');
      return;
    }

    this.isloading = true;

    console.log(this.selectedNodes);

    this.editBizMenu().subscribe((meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
        this.msg.success('保存成功！');
      } else {
        this.msg.error('保存失败！');
      }
      this.isloading = false;
    });
  }

  private editBizMenu() {
    return this.http.post(this.editBizMenuUrl,
      {bizId: this.selectBiz, menuId: this.selectedNodes});
  }



}
