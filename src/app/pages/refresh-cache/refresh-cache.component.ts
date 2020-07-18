import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { MeeResult } from 'src/app/interface';
import { NzMessageService } from 'ng-zorro-antd';
import { state, useAnimation, trigger, style, transition, animate } from '@angular/animations';
import { iconAnimation } from 'src/app/service/animations';


@Component({
  selector: 'app-refresh-cache',
  templateUrl: './refresh-cache.component.html',
  styleUrls: ['./refresh-cache.component.less'],
  animations: [
    trigger('iconChange',
    [
      state('open', style({
          color: 'gray',
          fontSize: '25px'
        })
      ),
      state('closed', style({
          color: 'rgba(0, 0, 0, 0.45)',
          fontSize: '20px'
        })
      ),
      transition('open => closed', [
        animate('0.2s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.2s ease-in-out')
      ])
    ])
  ]
})
export class RefreshCacheComponent implements OnInit {

  refreshCacheUrl: string;

  onTouch = false;

  isSpin = false;

  @Output() refreshResult: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private message: NzMessageService
  ) {
    this.refreshCacheUrl = environment.refreshCacheUrl;

  }

  ngOnInit(): void {

  }


  refresh(): void {
    this.isSpin = true;
    this.postRefresh().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.message.success('刷新成功！');
      } else {
        this.message.error('刷新成功！');
      }
      this.isSpin = false;
      this.refreshResult.emit(result.statusCode === 0);
    });
  }

  postRefresh() {
    const url = this.refreshCacheUrl + '/' + this.authService.getBizId();
    return this.http.post(url, null);
  }

  onMouseEnter() {
    this.onTouch = true;
  }

  onMouseLever() {
    this.onTouch = false;
  }
}
