import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { MeeResult, Menu } from 'src/app/interface';
import { NzTreeNodeOptions } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';

type Callback = (data: any)  => void;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuUrl: string;

  constructor(
        private http: HttpClient) {
          this.menuUrl = environment.menuUrl;
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


}
