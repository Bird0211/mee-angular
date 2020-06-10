import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { MeeResult, Menu } from 'src/app/interface';
import { NzTreeNodeOptions, NzMessageService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

type Callback = (data: any)  => void;

@Injectable({
  providedIn: 'root'
})
export class MenuService implements CanActivate {

  menuUrl: string;

  userMenuUrl: string;

  orderFlowUrl: string;

  subMenuUrl: string;

  menus: Menu[];

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private messageService: NzMessageService
      ) {
          this.menuUrl = environment.menuUrl;
          this.userMenuUrl = environment.usermenuUrl;
          this.orderFlowUrl = environment.orderFlowUrl;
          this.subMenuUrl = environment.subMenuUrl;
        }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        if (!this.menus || this.menus.length <= 0) {
          this.messageService.error('权限不够, 禁止访问! ');
          return false;
        }

        const bizId = this.authService.getBizId();
        const userId = this.authService.getBizId();
        if (!bizId && !userId) {
          this.messageService.error('登录信息有误！');
          return false;
        }

        const path = route.routeConfig.path;
        if (this.checkMenu(this.menus, path)) {
          return true;
        } else {
          this.messageService.error('权限不够, 禁止访问!');
          return false;
        }
  }

  checkMenu(menus: Menu[], path: string): boolean {
    if (!menus || menus.length <= 0) {
      return false;
    }

    console.log('CheckMenu' , menus, path);
    if (menus.filter(item => item.url === path).length > 0) {
      console.log('filter true');
      return true;
    } else {
      for (const item of menus) {
        if (item.subMenu && this.checkMenu(item.subMenu, path)) {
          return true;
        }
      }
    }

    return false;
  }

  loadMenu(bizId: string, callback: Callback) {
    const url = this.menuUrl + '/' + bizId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        // 'Authorization': 'my-auth-token'
      })
    };

    const req = new HttpRequest('GET', url, '' , httpOptions);
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (e: HttpResponse<MeeResult>) => {
          const response: MeeResult = e.body;
          callback(response);
        },
        (e) => {
          console.log(e);
        }
      );
  }

  loadSubMenus(bizId: string, userId: string, menuId: string): Promise<Menu[]> {
    const promise = new Promise<Menu[]>((resolve, reject) => {
      this.getSubMenus(bizId, userId, menuId).subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
            resolve(result.data);
        } else {
            reject();
        }
      });
    });
    return promise;
  }

  getSubMenus(bizId: string, userId: string, menuId: string) {
    const url = this.subMenuUrl + '/' + bizId + '/' + userId + '/' + menuId;
    return this.http.get(url);
  }

  loadUserMenus(bizId: string, userId: string): Promise<Menu[]> {
    const promise = new Promise<Menu[]>((resolve, reject) => {
      this.getUserMenus(bizId, userId).subscribe((result: MeeResult) => {
        if (result.statusCode === 0 && result.data != null) {
          resolve(result.data);
          this.menus = result.data;
          console.log('UserMenus', this.menus);
        } else {
          reject();
        }
      });

    });
    return promise;
  }

  getUserMenus(bizId: string, userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        // 'Authorization': 'my-auth-token'
      })
    };

    const url = this.userMenuUrl + '/' + bizId + '/' + userId;
    return this.http.get(url, httpOptions);

  }

  menusToNodes(menus: Menu[]) {
    const treeNode: NzTreeNodeOptions[] = [];
    if (menus && menus.length > 0) {
      menus.forEach(menu => {
        const node: NzTreeNodeOptions = this.menuToNude(menu);
        if (node != null) {
          treeNode.push(node);
        }
      });
    }
    return treeNode;
  }

  private menuToNude(menu: Menu): NzTreeNodeOptions {
    if (menu === null) {
        return null;
    }

    const node: NzTreeNodeOptions = {title: menu.title,
      key: menu.id.toString(),
      icon: menu.icon,
      isLeaf: !menu.subMenu || menu.subMenu.length <= 0,
      description: menu.description,
      url: menu.url,
      type: menu.type,
      level: menu.level,
      sort: menu.sort,
      iconColor: menu.iconColor,
      parentId: menu.parentId,
      children: this.menusToNodes(menu.subMenu),
      menu
    };
    return node;
  }

  loadOrderFlowMenu(bizId: number): Promise<Menu[]> {
    const promise = new Promise<Menu[]>((resolve, reject) => {
      this.getOrderFlowMenu(bizId).subscribe((result: MeeResult) => {
        if (result.statusCode === 0 && result.data) {
           resolve(result.data);
        } else {
           reject();
        }
      });
    });

    return promise;
  }

  getOrderFlowMenu(bizId: number) {
    const url = this.orderFlowUrl + '/' + bizId;
    return this.http.get(url);
  }

  jumpto(menu: Menu) {
    if (menu.type === '0') {
      if (menu.url !== null && menu.url.length > 0) {
        this.router.navigate([menu.url], {skipLocationChange: true});
      } else {
        this.router.navigate(['menu', menu.id], {skipLocationChange: true} );
      }
    } else if (menu.type === '1') {
      const url = menu.url;
      this.router.navigate(['iframe'], {skipLocationChange: true , queryParams: { jumpurl: url}});
    } else if (menu.type === '2') {
      window.location.href = menu.url;
    }
  }


}
