import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzIconService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  isCollapsed = true;

  constructor(public translate: TranslateService,
              public iconService: NzIconService
    ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: environment.iconUrl
    });
  }


}
