import { Component, OnInit } from '@angular/core';
import { NzPostConfig } from 'src/app/interface';
import { AuthService } from '../auth.service';
import { NzPostConfigService } from 'src/app/service/nz-post-config.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-nzpost-config',
  templateUrl: './nzpost-config.component.html',
  styleUrls: ['./nzpost-config.component.less']
})
export class NzpostConfigComponent implements OnInit {

  nzpostConfigs: NzPostConfig[];

  isVisible = false;

  entity: NzPostConfig = {};

  title: string;

  loading = false;


  constructor(private authService: AuthService,
              private nzPostConfigService: NzPostConfigService,
              private modal: NzModalService,
              private message: NzMessageService
    ) { }

  ngOnInit(): void {
    this.loadNzPostConfig();
  }

  add() {
    this.entity = {
      id: null,
      bizId: this.authService.getBizId(),
      countryCode: 'NZ'
    };
    this.title = 'Add NzPost Config';
    this.isVisible = true;
  }

  edit(value: NzPostConfig) {
    this.entity = value;
    this.title = 'Edit NzPost Config';
    this.isVisible = true;
  }

  del(value: number) {
    this.nzPostConfigService.delateNzConfig(value).subscribe((result: boolean) => {
      if (result) {
        this.message.success('删除成功!');
        this.loadNzPostConfig();
      } else {
        this.message.error('删除失败!');
      }
    });
  }

  handleCancel() {
    this.isVisible = false;
    this.entity = {};
  }

  handleOk() {
    if (!this.entity) {
      return;
    }

    if (!this.entity.name ||
        !this.entity.city ||
        !this.entity.companyName ||
        !this.entity.countryCode ||
        !this.entity.email ||
        !this.entity.phone ||
        !this.entity.postcode ||
        !this.entity.street ||
        !this.entity.suburb) {
          this.modal.error({
            nzTitle: '参数错误!',
            nzContent: '请填写所有信息...'
          });

          return;
    }

    this.loading = true;
    if (this.entity.id === null) {
      this.nzPostConfigService.addNzConfig(this.entity).subscribe((result: boolean) => {
        if (result) {
          this.message.success('添加成功!');
          this.loadNzPostConfig();
        } else {
          this.message.error('添加失败!');
        }
        this.loading = false;
        this.isVisible = false;

      });
    } else {
      this.nzPostConfigService.updateNzConfig(this.entity).subscribe((result: boolean) => {
        if (result) {
          this.message.success('更新成功!');
          this.loadNzPostConfig();
        } else {
          this.message.error('更新失败!');
        }
        this.loading = false;
        this.isVisible = false;
      });
    }

  }

  loadNzPostConfig() {
    this.nzPostConfigService.loadNzConfig(this.authService.getBizId()).subscribe((result: NzPostConfig[]) => {
      this.nzpostConfigs = result;
      console.log(this.nzpostConfigs);
    });
  }


}
