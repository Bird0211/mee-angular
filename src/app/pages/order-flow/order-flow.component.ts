import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interface';
import { AuthService } from '../auth.service';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-order-flow',
  templateUrl: './order-flow.component.html',
  styleUrls: ['./order-flow.component.less']
})
export class OrderFlowComponent implements OnInit {

  menus: Menu[];

  constructor(private menuService: MenuService,
              private authService: AuthService

    ) { }

  ngOnInit(): void {
    this.loadMenus();

  }

  loadMenus() {
    const bizId = this.authService.getBizId();
    this.menuService.loadOrderFlowMenu(bizId).then((result: Menu[]) => this.menus = result);
  }

}
