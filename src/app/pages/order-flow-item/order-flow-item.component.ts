import { Component, OnInit, Input } from '@angular/core';
import { Menu } from 'src/app/interface';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-order-flow-item',
  templateUrl: './order-flow-item.component.html',
  styleUrls: ['./order-flow-item.component.less']
})
export class OrderFlowItemComponent implements OnInit {

  @Input() menu: Menu;

  isShadow = false;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  jumpTo() {
    console.log(this.menu);
    this.menuService.jumpto(this.menu);
  }

}
