import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzIconService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  isZh = true;

  constructor(public translate: TranslateService,
              public iconService: NzIconService
    ) {
    translate.addLangs(['en', 'zh']);
    translate.setDefaultLang('zh');
    translate.use('zh');
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|zh/) ? browserLang : 'zh');
    // console.info(translate.currentLang);
    this.iconService.fetchFromIconfont({
      scriptUrl: environment.iconUrl
    });
  }

  changeLangus() {
    if (this.translate.currentLang === 'zh') {
        this.translate.use('en');
    } else {
      this.translate.use('zh');
    }
  }

}
