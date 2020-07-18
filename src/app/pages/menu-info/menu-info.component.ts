import { Component, OnInit, Input } from '@angular/core';
import { Menu, YiYunUser, AuthParam } from 'src/app/interface';
import { AuthService } from '../auth.service';
import { MenuService } from '../menu/menu.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.less']
})
export class MenuInfoComponent implements OnInit {

  @Input() mode: string | 'horizontal';

  @Input() theme: string | 'light';

  @Input() isCollapsed: boolean | false;

  menus: Menu[];

  isLoading = true;

  constructor(private menuService: MenuService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.authService.getLoggedInName.subscribe((user: YiYunUser) => this.loadMenu());
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    const bizId = this.authService.getBizId();
    if (bizId && userId) {
      this.menuService.loadUserMenus(bizId.toString(), userId.toString()).
          then(menus => {this.menus = menus; this.isLoading = false; }).
          catch(() => this.isLoading = false);

    }
  }

  jumpto(menu: Menu) {
    this.menuService.jumpto(menu);
  }

  jumpback() {
    const param: AuthParam = this.authService.loadAuthParam();
    this.router.navigate(['dashboard', param.bizid,
            param.userid,
            param.time,
            param.nonce,
            param.sign]);
  }

}
