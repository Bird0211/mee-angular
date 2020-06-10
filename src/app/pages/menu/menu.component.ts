import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NzIconService } from 'ng-zorro-antd';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { MenuService } from './menu.service';
import { Menu } from 'src/app/interface';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  animations: [
    trigger('hideDiv', [
      state('open', style({
        display: 'block',
        opacity: 1
      })),
      state('closed', style({
        display: 'none',
        opacity: 0
      })),
      transition('open <=> closed', [
        animate('0.5s 300ms ease-in-out', keyframes ([
          style({ opacity: 0.2, offset: 0.7 })
        ]))
      ])
    ]),
    trigger('showFrame', [
      state('open', style({
        display: 'block',
        height: '800px',
        opacity: 1
      })),
      state('closed', style({
        display: 'none',
        height: '0px',
        opacity: 0
      })),
      transition('open <=> closed', [
        animate('0.5s 300ms ease-in-out', keyframes ([
          style({ opacity: 0.2, offset: 0.7 })
        ]))
      ])
    ])
  ],
  providers: [AuthService]
})
export class MenuComponent implements OnInit {

  menus: Menu[];

  constructor(
              private iconService: NzIconService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private menuService: MenuService) {
              this.iconService.fetchFromIconfont({
                scriptUrl: environment.iconUrl
              });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadMenu(id);
  }

  loadMenu(id: string) {
    const userId = this.authService.getUserId();
    const bizId = this.authService.getBizId();
    if (bizId && userId) {
      this.menuService.loadSubMenus(bizId.toString(), userId.toString(), id).
          then(menus => this.menus = menus).
          catch(() => console.log('Load Menu error!'));

    }
  }


  jumpto(menu: Menu) {
    this.menuService.jumpto(menu);
  }

}
