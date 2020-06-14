import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { MeeResult } from 'src/app/interface';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-flyway-setting',
  templateUrl: './flyway-setting.component.html',
  styleUrls: ['./flyway-setting.component.less']
})
export class FlywaySettingComponent implements OnInit {

  validateForm: FormGroup;

  flywayTokenUrl: string;

  isLoading = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private http: HttpClient,
              private message: NzMessageService
    ) {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]]
    });

    this.flywayTokenUrl = environment.flywayTokenUrl;
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  ngOnInit(): void {
  }

  submitForm(): void {

    this.isLoading = true;

    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const userName = this.validateForm.value.userName;
      const password = this.validateForm.value.password;
      this.postFlyway(userName, password).subscribe((result: MeeResult) => {
        this.isLoading = false;
        if (result.statusCode === 0) {
          this.message.success('设置成功!');
        } else  {
          this.message.error('设置失败!');
        }
      });
    }

  }

  postFlyway(username: string, password: string) {
    const url = this.flywayTokenUrl + '/' + this.authService.getBizId();
    const httpOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
    };

    const body = 'username=' + username + '&password=' + password;

    return this.http.post(url, body, httpOptions);
  }

}

