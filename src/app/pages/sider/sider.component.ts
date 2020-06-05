import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.less']
})
export class SiderComponent implements OnInit {

  @Input() isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
