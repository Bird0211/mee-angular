import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { NzTreeNodeOptions, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { MenuService } from '../menu/menu.service';
import { MeeResult, Menu } from 'src/app/interface';

@Component({
  selector: 'app-menutree',
  templateUrl: './menutree.component.html',
  styleUrls: ['./menutree.component.less']
})
export class MenutreeComponent implements OnInit , OnChanges {

  @Input() bizId: string;

  @Input() selectedNodes: string[] = [];

  @Output() selectedNodesChange = new EventEmitter<string[]>();

  nodes: NzTreeNodeOptions[] = [];

  checkedNodes: string[] = [];

  menus: Menu[];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNodes && changes.selectedNodes.currentValue) {
      this.refreshChecked();
    }

    if (changes.bizId && changes.bizId.currentValue) {
      this.loadAllMenu(this.bizId);
    }
  }

  loadAllMenu(bizId: string) {
    this.menuService.loadMenu(bizId, (meeResult: MeeResult) => {
      if (meeResult.statusCode === 0 && meeResult.data != null) {
        this.menus = meeResult.data;
        this.loadNodes();
      }
    });
  }

  loadNodes() {
    this.nodes = this.menuService.menusToNodes(this.menus);
  }

  refreshChecked() {
    this.checkedNodes = [];
    this.getCheckNodes(this.nodes);
  }

  onCheckBox(event: NzFormatEmitEvent) {
    const node: NzTreeNode = event.node;
    const parentNode = node.getParentNode();
    const childrenNodes = node.getChildren();

    if (node.isChecked) {
      if (this.selectedNodes.indexOf(node.key) < 0) {
        this.selectedNodes = [...this.selectedNodes, node.key];
      }
      if (parentNode) {
        if (this.selectedNodes.indexOf(parentNode.key) < 0) {
          this.selectedNodes = [...this.selectedNodes, parentNode.key];
        }
      }

      if (childrenNodes && childrenNodes.length > 0) {
        childrenNodes.forEach( item => {
          if (this.selectedNodes.indexOf(item.key) < 0) {
            this.selectedNodes = [...this.selectedNodes, item.key];
          }
        });
      }
    } else {
      this.selectedNodes = this.selectedNodes.filter(item => item !== node.key);
      if (parentNode) {
        const sameLevelNodes = parentNode.getChildren();
        if (!sameLevelNodes || sameLevelNodes.length <= 0) {
          this.selectedNodes = this.selectedNodes.filter(item => item !== parentNode.key);
        }
      }

      if (childrenNodes && childrenNodes.length > 0) {
        childrenNodes.forEach( item => {
            this.selectedNodes = this.selectedNodes.filter(i => i !== item.key);
        });
      }
    }
    this.selectedNodesChange.emit(this.selectedNodes);
  }

  getCheckNodes(nodes: NzTreeNodeOptions[]) {
    nodes.forEach(item => {
      if (item.isLeaf) {
        if (this.selectedNodes.indexOf(item.key) >= 0) {
          this.checkedNodes = [...this.checkedNodes, item.key];
        }
      } else {
        this.getCheckNodes(item.children);
      }
    });
  }

}
