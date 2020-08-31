import { Component, OnInit } from '@angular/core';
import { MeeResult, TradeMeToken } from 'src/app/interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trademe-add-button',
  templateUrl: './trademe-add-button.component.html',
  styleUrls: ['./trademe-add-button.component.less']
})
export class TrademeAddButtonComponent implements OnInit {

  tradeMeOauthUrl: string;

  tradeMerRquestUrl: string;

  constructor(private http: HttpClient,
              private authService: AuthService
    ) {
      this.tradeMeOauthUrl = environment.tradeMeOauthUrl;
      this.tradeMerRquestUrl = environment.tradeMerRquestUrl;
    }

  ngOnInit(): void {
  }

  add() {
    this.postToken().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        const data: TradeMeToken = result.data;
        window.location.href = this.tradeMeOauthUrl + data.oauth_token;
      }
    });
  }

  postToken() {
    const url = this.tradeMerRquestUrl + '/' + this.authService.getBizId();
    return this.http.post(url, null);
  }

}
