import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PlatFormDetail } from 'src/app/interface';
import { PlatformService } from 'src/app/service/platform.service';
import { UggService } from 'src/app/service/ugg.service';

@Component({
  selector: 'app-ugg-setting',
  templateUrl: './ugg-setting.component.html',
  styleUrls: ['./ugg-setting.component.less']
})
export class UggSettingComponent implements OnInit {

  validateForm!: FormGroup;

  isLoading: boolean;

  constructor(private fb: FormBuilder,
              private platService: PlatformService,
              private uggService: UggService,
              private message: NzMessageService
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.initData();
  }

  submitForm(): void {
    this.isLoading = true;

    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    this.uggService.setToken(this.validateForm.value.userName, this.validateForm.value.password).subscribe(() => {
        this.message.success('设置成功!');
        this.initData();
        this.isLoading = false;
      }, () => {
        this.message.error('设置失败!');
        this.isLoading = false;
      }
    );


  }

  initData() {
    this.platService.loadPlatFormDetail('ugg').then((result: PlatFormDetail[]) => {
      if (result && result.length > 0) {
        const uggInfo = result[0];
        this.validateForm.patchValue({userName: uggInfo.clientId, password: uggInfo.clientSecret});
      }
    });
  }

}
