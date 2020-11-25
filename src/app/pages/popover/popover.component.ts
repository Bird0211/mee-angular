import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.less']
})
export class PopoverComponent implements OnInit {

  @Input() data: number;

  @Output() dataChange: EventEmitter<number> = new EventEmitter();

  isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  change() {
    this.dataChange.emit(this.data);
    this.isVisible = false;
  }
}
