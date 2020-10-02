import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TradeMeSoltOrder, PaidSoltOrder, NzPostConfig, ShippedOptionReq, ShippedOptionService } from 'src/app/interface';
import { NzPostConfigService } from 'src/app/service/nz-post-config.service';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-payment-received',
  templateUrl: './payment-received.component.html',
  styleUrls: ['./payment-received.component.less']
})
export class PaymentReceivedComponent implements OnInit, OnChanges {

  @Input() orders: PaidSoltOrder[];

  @Input() nzconfig: NzPostConfig;

  @Output() selectItems: EventEmitter<PaidSoltOrder[]> = new EventEmitter();
  @Output() ordersChange: EventEmitter<PaidSoltOrder[]> = new EventEmitter();

  checked = false;
  indeterminate = false;
  serviceVisible = false;

  setOfCheckedId = new Set<string>();

  previewImage: string | undefined = '';
  previewVisible = false;
  editAddressVisible = false;
  editAddressTitle: string;

  editOrder: PaidSoltOrder;

  nzPostService: ShippedOptionService[];

  selectOrder: PaidSoltOrder;

  selectNzPost: ShippedOptionService;

  selectDimension: number;

  constructor(
        private modal: NzModalService,
        private nzPostConfigService: NzPostConfigService,

  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    /*
    if (changes.orders && changes.orders.currentValue) {
      this.paidOrders = this.orders.map(item => this.changePaidOrder(item));
    }
    */
    if (changes.nzconfig && changes.nzconfig.currentValue) {
      this.orders.filter(item => item.dimensions).
        forEach(item => item.dimensions.forEach(d => {d.serviceCode = null; d.addOns = null;}));
    }

  }

  ngOnInit(): void {
    /*
    if (this.orders) {
      this.paidOrders = this.orders.map(item => this.changePaidOrder(item));
    }
    */

  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.orders.forEach(item => this.updateCheckedSet(item.orderId, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: TradeMeSoltOrder[]): void {
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.orders.every(item => this.setOfCheckedId.has(item.orderId));
    this.indeterminate = this.orders.some(item => this.setOfCheckedId.has(item.orderId)) && !this.checked;
    this.selectItems.emit(this.orders.filter(item => this.setOfCheckedId.has(item.orderId)));
    this.ordersChange.emit(this.orders);
  }

  isMerge(selectItem: PaidSoltOrder) {
    if (!selectItem || !selectItem.deliveryAddress) {
      return false;
    }
    if (this.orders && this.orders.length > 0) {
      if (this.orders.filter(item => item.deliveryAddress && item.deliveryAddress.name === selectItem.deliveryAddress.name &&
        item.deliveryAddress.address1 === selectItem.deliveryAddress.address1 &&
        item.deliveryAddress.phoneNumber === selectItem.deliveryAddress.phoneNumber
        ).length > 1) {
        return true;
      }
    }

    return false;
  }

  marge(selectItem: PaidSoltOrder) {
    if (!selectItem || !selectItem.deliveryAddress) {
      return false;
    }
    if (this.orders && this.orders.length > 0) {
      this.orders.filter(item => item.deliveryAddress && item.deliveryAddress.name === selectItem.deliveryAddress.name &&
        item.deliveryAddress.address1 === selectItem.deliveryAddress.address1 &&
        item.deliveryAddress.phoneNumber === selectItem.deliveryAddress.phoneNumber && item !== selectItem
        ).forEach(item => {
          selectItem.items.push(...item.items);
          selectItem.orderId = selectItem.orderId + (';' + item.orderId);
        });

      this.orders = this.orders.filter(item => !item.deliveryAddress ||
        item.deliveryAddress.name !== selectItem.deliveryAddress.name &&
        item.deliveryAddress.address1 !== selectItem.deliveryAddress.address1 &&
        item.deliveryAddress.phoneNumber !== selectItem.deliveryAddress.phoneNumber || item === selectItem);
      this.ordersChange.emit(this.orders);

    }
  }

  showImg(img: string) {
    this.previewImage = img;
    this.previewVisible = true;
  }

  getTotalQuantity(selectItem: PaidSoltOrder): number {
    return selectItem.items.map(item => item.quantity).reduce((num, item) => num + item);
  }

  getTotalPrice(selectItem: PaidSoltOrder): number {
    return selectItem.items.map(item => item.price).reduce((num, item) => num + item);
  }

  addVolumes(value: PaidSoltOrder) {
    value.dimensions.push({volumes: 1, weight: 1, length: 100, width: 100, height: 100});
  }

  editAddress(value: PaidSoltOrder) {
    this.editAddressTitle = value.orderId + ' Edit Delivery Detail';
    this.editOrder = JSON.parse(JSON.stringify(value));
    if (!this.editOrder.deliveryAddress) {
      this.editOrder.deliveryAddress = {
        name: null,
        address1: null,
        address2: null,
        suburb: null,
        city: null,
        postcode: null,
        country: null,
        phoneNumber: null
      };
    }
    this.editAddressVisible = true;
  }

  saveEditAddress() {
    this.orders = this.orders.map((item: PaidSoltOrder) => {
      if (item.orderId === this.editOrder.orderId) {
        item = JSON.parse(JSON.stringify(this.editOrder));
        if (item.dimensions) {
          item.dimensions.forEach(i => {i.serviceCode = null; i.addOns = null;});
        }
      }
      return item;
    });
    this.editAddressVisible = false;
    this.ordersChange.emit(this.orders);
  }

  changeLength(value: number, data: PaidSoltOrder, i: number) {
    data.dimensions[i].length = value;
    data.dimensions[i].volumes = data.dimensions[i].length / 100 * data.dimensions[i].width / 100 * data.dimensions[i].height / 100;
    data.dimensions[i].serviceCode = null;
    data.dimensions[i].addOns = null;
    this.selectItems.emit(this.orders.filter(item => this.setOfCheckedId.has(item.orderId)));
    this.ordersChange.emit(this.orders);
  }

  changeWidth(value: number, data: PaidSoltOrder, i: number) {
    data.dimensions[i].width = value;
    data.dimensions[i].volumes = data.dimensions[i].length / 100 * data.dimensions[i].width / 100 * data.dimensions[i].height / 100;
    data.dimensions[i].serviceCode = null;
    data.dimensions[i].addOns = null;
    this.selectItems.emit(this.orders.filter(item => this.setOfCheckedId.has(item.orderId)));
    this.ordersChange.emit(this.orders);
  }

  changeHeight(value: number, data: PaidSoltOrder, i: number) {
    data.dimensions[i].height = value;
    data.dimensions[i].volumes = data.dimensions[i].length / 100 * data.dimensions[i].width / 100 * data.dimensions[i].height / 100;
    data.dimensions[i].serviceCode = null;
    data.dimensions[i].addOns = null;
    this.selectItems.emit(this.orders.filter(item => this.setOfCheckedId.has(item.orderId)));

    this.ordersChange.emit(this.orders);
  }

  changeVolume(value: number, data: PaidSoltOrder, i: number) {
    data.dimensions[i].volumes = value;
    data.dimensions[i].serviceCode = null;
    data.dimensions[i].addOns = null;
    this.selectItems.emit(this.orders.filter(item => this.setOfCheckedId.has(item.orderId)));

    this.ordersChange.emit(this.orders);
  }

  changeWeight(value: number, data: PaidSoltOrder, i: number) {
    data.dimensions[i].weight = value;
    data.dimensions[i].serviceCode = null;
    data.dimensions[i].addOns = null;
    this.selectItems.emit(this.orders.filter(item => this.setOfCheckedId.has(item.orderId)));

    this.ordersChange.emit(this.orders);
  }

  removeVolume(data: PaidSoltOrder, i: number) {
    data.dimensions = data.dimensions.filter((item, index) => index !== i);
    this.selectItems.emit(this.orders.filter(item => this.setOfCheckedId.has(item.orderId)));

    this.ordersChange.emit(this.orders);
  }

  selectService(data: PaidSoltOrder, i: number) {
    if (!this.nzconfig) {
      this.modal.error({
        nzTitle: 'NzConfig Error!',
        nzContent: 'Please Select NzConfig First!'
      });
      return ;
    }

    if (!data.deliveryAddress) {
      this.modal.error({
        nzTitle: 'Missing DeliveryAddress!',
        nzContent: 'Please Add DeliveryAddress!'
      });
      return ;
    }

    this.selectDimension = i;

    const entity: ShippedOptionReq = {
      weight: '' + data.dimensions[i].weight,
      length: '' + data.dimensions[i].length,
      width: '' + data.dimensions[i].weight,
      height: '' + data.dimensions[i].height,
      diameter: '' + data.dimensions[i].volumes,
      pickup: {
        suburb: this.nzconfig.suburb,
        city: this.nzconfig.city,
        postcode: this.nzconfig.postcode
      },
      delivery: {
        suburb: data.deliveryAddress.suburb,
        city: data.deliveryAddress.city,
        postcode: data.deliveryAddress.postcode
      }
    };

    this.selectNzPost = null;

    this.nzPostConfigService.getShippedOption(entity).subscribe((result: ShippedOptionService[]) => {
        this.selectOrder = data;
        result.forEach(item => {
          if (item.addons) {
              item.addons.filter(addons => addons.mandatory).forEach(addons => addons.checked = true);
          }
          if (item.service_code === this.selectOrder.dimensions[i].serviceCode) {
            if (item.addons && this.selectOrder.dimensions[i].addOns) {
              item.addons.filter(addcode => this.selectOrder.dimensions[i].addOns.indexOf(addcode.addon_code) >= 0).
                forEach(addons => addons.checked = true);
            }
            this.selectNzPost = item;
          }
        });
        this.nzPostService = result;
        this.serviceVisible = true;
    }, () => this.modal.error({
        nzTitle: 'Nz Service Error!',
        nzContent: 'Please Check Delivery Address!'
      }));
  }

  addPostService() {
    if (!this.selectNzPost) {
      this.modal.error({
        nzTitle: 'NzPost Service!',
        nzContent: 'Please Select NzPost Services!'
      });
      return;
    }

    if (this.selectOrder.carrier && this.selectOrder.carrier !== this.selectNzPost.carrier) {
      this.modal.error({
        nzTitle: 'Carrier Different!',
        nzContent: 'Please Select carrier of ' + this.selectOrder.carrier
      });
      return;
    }

    this.selectOrder.carrier = this.selectNzPost.carrier;
    this.selectOrder.dimensions[this.selectDimension].serviceCode = this.selectNzPost.service_code;
    this.selectOrder.dimensions[this.selectDimension].addOns = this.selectNzPost.addons.filter(i => i.checked).map(i => i.addon_code);
    this.serviceVisible = false;
  }


}
