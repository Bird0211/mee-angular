import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild } from '@angular/core';
import { OptionInfo, OrderInfo, OrderOptionComponent, OrderSource } from 'src/app/interface';
import { OrderUggComponent } from '../order-ugg/order-ugg.component';
import { OrderOptionHostDirective } from './order-option-host.directive';

@Component({
  selector: 'app-order-options',
  templateUrl: './order-options.component.html',
  styleUrls: ['./order-options.component.less'],
  animations: [
    trigger('showAffix', [
      state('open', style({
        opacity: 1,
        bottom: '0px'
      })),
      state('closed', style({
        opacity: 0,
        bottom: '-10px'
      })),
      transition('open <=> closed', [
        animate('0.5s')
      ])
    ])
  ]
})
export class OrderOptionsComponent implements OnInit, OnChanges {

  @Input() data: OrderInfo[];
  @Input() bizId: number;
  @Input() orderSource: OrderSource;

  options: OptionInfo[];

  @ViewChild(OrderOptionHostDirective, {static: true})

  orderOptionHostDirective: OrderOptionHostDirective;

  isOpen = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      if (!this.data || this.data.length <= 0) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    }
  }

  ngOnInit(): void {
    this.initOption();
  }

  initOption() {
    this.options = [
      {
        icon: 'icon-Boots',
        title: 'UGG',
        description: 'UGG下单',
        component: OrderUggComponent
      }
    ];
  }

  jump(option: OptionInfo) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(option.component);
    const viewContainerRef = this.orderOptionHostDirective.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as OrderOptionComponent).data = this.data;
    (componentRef.instance as OrderOptionComponent).bizId = this.bizId;
    (componentRef.instance as OrderOptionComponent).orderSource = this.orderSource;
    (componentRef.instance as OrderOptionComponent).callback.subscribe((ocrResult: any) => {

    });
  }
}
