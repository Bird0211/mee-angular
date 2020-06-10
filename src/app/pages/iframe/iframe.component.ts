import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.less']
})
export class IframeComponent implements OnInit {

  jumpurl: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        console.log(params);
        const url = params.jumpurl +  '&bid=' + this.authService.getBizId() + '&uid=' + this.authService.getUserId() +
        '&v=' + Date.parse(new Date().toString());
        this.jumpurl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        console.log(this.jumpurl);
      }
    );
  }

}
