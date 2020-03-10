import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-nzcard',
  templateUrl: './nzcard.component.html',
  styleUrls: ['./nzcard.component.less'],
  animations: [
    trigger('iconChange', [
      state('open', style({
        color: '{{iconColor}}'
      }),
      { params: {iconColor: '#2593fc'}}
      ),
      state('closed', style({
        color: 'rgba(0, 0, 0, 0.65)'
      })),
      transition('open <=> closed', [
        animate('0.5s ease-in-out')
      ]),
    ])
  ]
})
export class NzcardComponent implements OnInit {

  isOpen = false;

  @Input() icon: string;

  @Input() title: string;

  @Input() description: string;

  @Input() iconColor: string;

  isChangeIcon = false;

  constructor() { }

  ngOnInit() {
  }

  showIcon(event: Event) {
    this.isOpen = true;
  }

  hideIcon(event: Event) {
    this.isOpen = false;
  }


}
