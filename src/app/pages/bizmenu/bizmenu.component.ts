import { Component, OnInit, OnChanges, SimpleChanges, Input, SimpleChange } from '@angular/core';
import { BizData, MeeResult, BizMenu } from 'src/app/interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NzMessageService} from 'ng-zorro-antd';
import { BizServiceService } from '../biz-service.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-bizmenu',
  templateUrl: './bizmenu.component.html',
  styleUrls: ['./bizmenu.component.less']
})
export class BizmenuComponent implements OnInit {

  selectBiz: string;

  editBizMenuUrl: string;

  selectedNodes: string[];

  isloading = false;

  constructor(private http: HttpClient,
              private msg: NzMessageService,
              private bizService: BizServiceService,
              private authService: AuthService
              ) {
    this.editBizMenuUrl = environment.editBizMenuUrl;

  }

  ngOnInit(): void {
    this.selectBiz = this.authService.getBizId().toString();
    this.loadSelectMenu();
  }

  changeValue() {
    this.loadSelectMenu();
  }


  saveBizMenu() {
    if (this.selectBiz == null) {
      this.msg.error('请选择商家');
      return;
    }

    this.isloading = true;

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

  loadSelectMenu() {
    this.bizService.loadBizMenu(this.selectBiz, (meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
        const bizMenu: BizMenu[] = meeResult.data;
        this.selectedNodes = bizMenu.map( item => item.menuId.toString());
      }
    });
  }

}
