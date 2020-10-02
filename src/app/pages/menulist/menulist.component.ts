import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { MeeResult, Menu } from 'src/app/interface';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { MenuService } from '../menu/menu.service';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTreeNodeOptions, NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.less']
})
export class MenulistComponent implements OnInit {

  nodes: NzTreeNodeOptions[];
  menus: Menu[];

  activedNode: NzTreeNode;
  activedMenu: Menu = {};

  visible = false;
  isAddMenuVisible = false;

  menuUrl: string;
  updateMenuUrl: string;
  addMenuUrl: string;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private nzContextMenuService: NzContextMenuService,
              private msg: NzMessageService,
              private menuService: MenuService) {
          this.menuUrl = environment.menuUrl;
          this.updateMenuUrl = environment.updateMenuUrl;
          this.addMenuUrl = environment.addMenuUrl;
   }

  ngOnInit(): void {
    // const bizId = this.authService.getBizId();
    this.menuService.loadMenu('all', (meeResult: MeeResult) => {
      if (meeResult.statusCode === 0 && meeResult.data != null) {
        this.menus = meeResult.data;
        this.loadNodes();
      }
    });
  }

  loadNodes() {
    this.nodes = this.menuService.menusToNodes(this.menus);
  }

  addSubmenu(): void {
    const id = this.activedMenu.id;
    const level = this.activedMenu.level;
    this.activedMenu = {};
    this.activedMenu.parentId = id;
    this.activedMenu.level = Number(level) + 1;
    this.isAddMenuVisible = true;
    this.visible = false;
    // this.addMenu();
  }

  updateOrSave() {
    const menu = this.activedMenu;
    if (menu.id) {
      this.update();
    } else {
      this.addMenu();
    }
  }

  addMenu() {
    const menu = this.activedMenu;
    menu.sort = this.nodes[this.nodes.length - 1].sort + 1;
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        // 'Authorization': 'my-auth-token'
      })
    };

    const req = new HttpRequest('POST', this.addMenuUrl, menu , httpOptions);
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (e: HttpResponse<MeeResult>) => {
          const response: MeeResult = e.body;
          if (response.statusCode === 0 && response.data != null && response.data) {
              const newMenu: Menu = response.data;
              this.menus = this.addNewMenu(this.menus, newMenu);
              this.loadNodes();
              this.msg.success('添加成功!');
              this.isAddMenuVisible = false;
          } else {
            this.msg.error('添加失败!');
          }
        },
        (e) => {
          console.log(e);
          this.msg.error('添加失败!');
        }
      );
  }

  addNewMenu(menus: Menu[], newMenu: Menu) {
    if (menus == null) {
      return menus;
    }

    if (newMenu.parentId === 0) {
      menus.push(newMenu);
    } else {
      menus.forEach((item, index) => {
        if (item.id === newMenu.parentId) {
          if (menus[index].subMenu == null) {
            menus[index].subMenu = new Array<Menu>();
          }
          menus[index].subMenu.push(newMenu);
        } else {
          menus[index].subMenu = this.addNewMenu(item.subMenu, newMenu);
        }
      });
    }
    return menus;
  }

  showAddMenu() {
    this.isAddMenuVisible = true;
    this.activedMenu = {};
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node;
    this.activedMenu = this.activedNode.origin.menu;
    this.visible = true;
  }

  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeDrawer() {
    this.visible = false;
  }

  cancelAddMenu() {
    this.isAddMenuVisible = false;
  }

  update() {
    const menu: Menu = this.activedMenu;

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        // 'Authorization': 'my-auth-token'
      })
    };

    const req = new HttpRequest('POST', this.updateMenuUrl, menu , httpOptions);
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (e: HttpResponse<MeeResult>) => {
          const response: MeeResult = e.body;
          if (response.statusCode === 0 && response.data != null && response.data) {
              this.msg.success('更新成功!');
              this.visible = false;

              this.updateNewMenu(this.menus, menu);
              this.loadNodes();

          } else {
            this.msg.error('更新失败!');
          }
        },
        (e) => {
          console.log(e);
          this.msg.error('更新失败!');
        }
      );
  }

  updateNewMenu(menus: Menu[], newMenu: Menu) {
    if (menus == null) {
      return menus;
    }

    menus.forEach((item, index) => {
      if (item.id === newMenu.id) {
        menus[index] = newMenu;
      } else {
        if (item.subMenu != null && item.subMenu.length > 0) {
          menus[index].subMenu = this.updateNewMenu(item.subMenu, newMenu);
        }
      }
    });
    return menus;
  }
}
