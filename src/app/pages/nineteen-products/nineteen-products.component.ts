import { Component, OnInit } from '@angular/core';
import { PlatFormInfo, MeeResult, NineTeenType, NineTeenGroup, NineTeenRequest, NineTeenProducts, NineTeenGoods,
          NineTeenSku, NineTeenProductResponse, MeeProduct, NineTeenUpdatePrice, NineTeenUpdateSku} from 'src/app/interface';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { NzMessageService, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { MeeProductService } from 'src/app/service/mee-product.service';
import { CurrencyService } from 'src/app/service/currency.service';
import { title } from 'process';
import { PlatformService } from 'src/app/service/platform.service';

@Component({
  selector: 'app-nineteen-products',
  templateUrl: './nineteen-products.component.html',
  styleUrls: ['./nineteen-products.component.less']
})
export class NineteenProductsComponent implements OnInit {

  platformId: number;
  typeId: number;
  subTypeId: number;
  groupId: number;

  productName: string;
  productSku: string;

  loading = false;
  updateLoading = false;

  exchangeRate: number;
  postage: number;
  coefficient = 1;
  coefficientV1 = 1;
  coefficientV2 = 1;
  coefficientV3 = 1;
  coefficientV4 = 1;
  coefficientV5 = 1;
  coefficientV6 = 1;


  isCollapse = true;

  platForms: PlatFormInfo[];
  nineTeenTypes: NineTeenType[];
  subTeenTypes: NineTeenType[];
  nineTeenGroup: NineTeenGroup[];
  nineTeenGoods: NineTeenGoods[] = [];

  nineTeenTypeUrl: string;
  nineTeenGroupUrl: string;
  nineTeenProductsUrl: string;

  nineTeenUpdateProductUrl: string;

  page = 1;
  pageSize = 20;
  total = 0;

  indeterminate = false;
  checked = false;
  setOfCheckedId = new Set<string>();

  editId: string | null = null;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private message: NzMessageService,
              private productService: MeeProductService,
              private modal: NzModalService,
              private currencyService: CurrencyService,
              private notification: NzNotificationService,
              private platFormService: PlatformService
    ) {
    this.nineTeenTypeUrl = environment.nineTeenTypeUrl;
    this.nineTeenGroupUrl = environment.nineTeenGroupUrl;
    this.nineTeenProductsUrl = environment.nineTeenProductsUrl;
    this.nineTeenUpdateProductUrl = environment.nineTeenUpdateProductUrl;
  }

  ngOnInit(): void {
    this.loadPlatFormInfo();
  }

  loadPlatFormInfo() {

    this.platFormService.loadPlatFormInfo('19').then((result: PlatFormInfo[]) => {
      this.platForms = result;
      this.platformId = this.platForms[0].id;
      this.initData();
    }).catch(() => {
      this.modal.error({
        nzTitle: '系统错误',
        nzContent: '请稍后再试!'
      });
    });
  }

  initData() {
    this.subTeenTypes = null;
    this.loadType(0);
    this.loadGroup();
    this.loadCurrency();
  }

  loadCurrency() {
    this.currencyService.loadCurrency().then(item => this.exchangeRate = item);
  }



  loadType(pid: number) {
    this.getType(pid).subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.nineTeenTypes = result.data;
      }
    });
  }

  getType(typeId: number) {
    const url = this.nineTeenTypeUrl + '/' + this.platformId + '/' + typeId;
    return this.http.get(url);
  }

  loadSubType(pid: number) {
    this.getType(pid).subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.subTeenTypes = result.data;
      }
    });
  }

  loadGroup() {
    this.getgroups().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        this.nineTeenGroup = result.data;
      }
    });
  }

  getgroups() {
    const url = this.nineTeenGroupUrl + '/' + this.platformId;
    return this.http.get(url);
  }

  typeChange(value: number) {
    this.typeId = value;
    if (!value) {
      this.subTeenTypes = null;
      this.subTypeId = null;
    } else {
      this.loadSubType(value);
    }
  }

  platFormChange(value: number) {
    this.platformId = value;
    this.initData();
  }

  submit() {
    if (!this.typeId && !this.subTypeId && !this.groupId && !this.productName && !this.productSku) {
      this.modal.error(
        {
          nzTitle: '缺少查询条件',
          nzContent: '请选择查询条件!'
        }
      );
    } else if (this.typeId && !this.subTypeId) {
      this.modal.error(
        {
          nzTitle: '请选择商品二级类别',
          nzContent: '系统检查到您已经选择了商品类别,请选择二级类别进行查询!'
        }
      );
    } else {
      this.loadProducts();
    }
  }

  loadProducts() {

    if ((!this.typeId && !this.subTypeId && !this.groupId && !this.productName && !this.productSku) ||
        (this.typeId && !this.subTypeId)) {
      return;
    }

    this.loading = true;
    this.setOfCheckedId.clear();
    this.refreshCheckedStatus();

    this.postProducts().subscribe((result: MeeResult) => {
      this.loading = false;
      if (result.statusCode === 0 && result.data) {
        this.nineTeenGoods = [];
        const response: NineTeenProductResponse = result.data;
        if (response) {
          this.total = response.total;
          this.page = response.page;
          this.pageSize = response.pageSize;

          const nineTeenProducts: NineTeenProducts[] = response.products;
          if (nineTeenProducts && nineTeenProducts.length > 0) {
            for (const product of nineTeenProducts) {
              const skus: NineTeenSku[] = product.skuInfo;
              if (skus && skus.length > 0) {
                for (const skuvo of skus) {
                  const good: NineTeenGoods = {
                    productName: product.productName,
                    goodCode: product.goodCode,
                    nameCh: product.nameCh,
                    nameEn: product.nameEn,
                    sku: skuvo.sku,
                    skuId: skuvo.skuId,
                    stock: skuvo.stock,
                    price: skuvo.price,
                    skuName: skuvo.name,
                    weight: skuvo.weight,
                    firstLevel: skuvo.firstLevel,
                    secondLevel: skuvo.secondLevel,
                    thirdLevel: skuvo.thirdLevel,
                    fourthLevel: skuvo.fourthLevel,
                    fifthLevel: skuvo.fifthLevel,
                    sixthLevel: skuvo.sixthLevel
                  };
                  this.nineTeenGoods = [...this.nineTeenGoods, good];
                }
              } else {
                const good: NineTeenGoods = {
                  productName: product.productName,
                  goodCode: product.goodCode,
                  nameCh: product.nameCh,
                  nameEn: product.nameEn,
                };
                this.nineTeenGoods = [...this.nineTeenGoods, good];
              }
            }

            this.loadMeeProducts();
          }
        }
      }
    });
  }

  postProducts() {
    const url = this.nineTeenProductsUrl + '/' + this.platformId;
    const requestParam: NineTeenRequest = {
      page: this.page,
      pageSize: this.pageSize,
      typeId: this.subTypeId,
      goodName: this.productName,
      skuCode: this.productSku,
      groupId: this.groupId
    };

    return this.http.put(url, requestParam);
  }

  pageIndexChange(value: number) {
    this.page = value;
    this.loadProducts();
  }

  updateCheckedSet(value: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(value);
    } else {
      this.setOfCheckedId.delete(value);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.setOfCheckedId.size > 0 &&
    this.nineTeenGoods.every(item => this.setOfCheckedId.has(item.goodCode.toString() + item.sku.toString()));
    this.indeterminate = this.nineTeenGoods.some(item => this.setOfCheckedId.
      has(item.goodCode.toString() + item.sku.toString())) && !this.checked;
    if (this.setOfCheckedId && this.setOfCheckedId.size > 0) {
      this.isCollapse = false;
    } else {
      this.isCollapse = true;
    }
  }

  onItemChecked(value: string, checked: boolean): void {
    this.updateCheckedSet(value, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.nineTeenGoods.forEach(item => this.updateCheckedSet(item.goodCode + item.sku, checked));
    this.refreshCheckedStatus();
  }


  loadMeeProducts() {
    const skus = this.nineTeenGoods.filter(item => item.sku).map(item => item.sku);

    this.productService.getProduct(skus).then((meeProduct: Map<string, MeeProduct>) => {
      this.nineTeenGoods.filter(item => item.sku).forEach(item => {
        if (meeProduct[item.sku]) {
          item.meeCostPrice = meeProduct[item.sku].costPrice;
          item.meeSalesPrice = meeProduct[item.sku].retailPrice;
          item.meeWeight = meeProduct[item.sku].weight;
        }
      });
    });
  }

  count() {
    if (this.setOfCheckedId === null || this.setOfCheckedId.size <= 0) {
      this.modal.error(
        {
          nzTitle: '未选中商品',
          nzContent: '请选择需要计算的商品!'
        }
      );
      return ;
    }

    if (!this.exchangeRate && !this.postage && !this.coefficient) {
      this.modal.error(
        {
          nzTitle: '缺少计算条件',
          nzContent: '请设置计算系数、邮费、汇率!'
        }
      );
      return ;
    }

    const noCostPrice = this.nineTeenGoods.filter(item => this.setOfCheckedId.has(item.goodCode + item.sku)).
        filter(item => !item.meeCostPrice).map(item => '[' + item.sku + ']' + item.productName).join('\n');

    const errorWeight = this.nineTeenGoods.filter(item => this.setOfCheckedId.has(item.goodCode + item.sku)).
        filter(item => this.postage && (!item.meeWeight || isNaN(+item.meeWeight))).
        map(item => '[' + item.sku + ']' + item.productName).join('<br>');

    if (noCostPrice) {
      this.notification.warning(
        '以下商品缺少易云成本价，请更新易云系统',
          noCostPrice,
        {
          nzDuration: 0
        }
      );
    }

    if (errorWeight) {
      this.notification.warning(
        '以下商品重量有误，请更新易云系统',
          errorWeight,
        {
          nzDuration: 0
        }
      );
    }

    this.nineTeenGoods.filter(item => this.setOfCheckedId.has(item.goodCode + item.sku)).forEach(item => this.countPrice(item));
  }

  countPrice(item: NineTeenGoods) {
    const rate = this.exchangeRate ? this.exchangeRate : 1;
    if (item.meeCostPrice) {

      if (this.postage && (!item.meeWeight || isNaN(+item.meeWeight))) {
        item.newPrice = null;
        item.newFirstPrice = null;
        item.newSecondLevel = null;
        item.newThirdLevel = null;
        item.newFourthLevel = null;
        item.newFifthLevel = null;
        item.newSixthLevel = null;
        return;
      }

      if (item.price) {
        const price: number = (item.meeCostPrice * this.coefficient * rate) +
        (this.postage && item.meeWeight ? this.postage * item.meeWeight * rate / 1000 : 0);
        item.newPrice = Number(price.toFixed(2));
      }

      if (item.firstLevel) {
        const price: number = (item.meeCostPrice * this.coefficientV1 * rate) +
        (this.postage && item.meeWeight ? this.postage * item.meeWeight * rate / 1000 : 0);
        item.newFirstPrice = Number(price.toFixed(2));
      }

      if (item.secondLevel) {
        const price: number = (item.meeCostPrice * this.coefficientV2 * rate) +
        (this.postage && item.meeWeight ? this.postage * item.meeWeight * rate / 1000 : 0);
        item.newSecondLevel = Number(price.toFixed(2));
      }

      if (item.thirdLevel) {
        const price: number = (item.meeCostPrice * this.coefficientV3 * rate) +
        (this.postage && item.meeWeight ? this.postage * item.meeWeight * rate / 1000 : 0);
        item.newThirdLevel = Number(price.toFixed(2));
      }

      if (item.fourthLevel) {
        const price: number = (item.meeCostPrice * this.coefficientV4 * rate) +
        (this.postage && item.meeWeight ? this.postage * item.meeWeight * rate / 1000 : 0);
        item.newFourthLevel = Number(price.toFixed(2));
      }

      if (item.fifthLevel) {
        const price: number = (item.meeCostPrice * this.coefficientV5 * rate) +
        (this.postage && item.meeWeight ? this.postage * item.meeWeight * rate / 1000 : 0);
        item.newFifthLevel = Number(price.toFixed(2));
      }

      if (item.sixthLevel) {
        const price: number = (item.meeCostPrice * this.coefficientV6 * rate) +
        (this.postage && item.meeWeight ? this.postage * item.meeWeight * rate / 1000 : 0);
        item.newSixthLevel = Number(price.toFixed(2));
      }
    }

  }

  update() {
    if (this.setOfCheckedId === null || this.setOfCheckedId.size <= 0) {
      this.modal.error(
        {
          nzTitle: '未选中商品',
          nzContent: '请选择需要计算的商品!'
        }
      );
      return ;
    }

    const products: NineTeenGoods[] = this.nineTeenGoods.filter(item => this.setOfCheckedId.has(item.goodCode + item.sku));

    if (products && products.filter(item => !item.newPrice || item.newPrice === 0).length > 0 ) {
      this.modal.error(
        {
          nzTitle: '新价格有误',
          nzContent: '部分勾选的商品, 没有新价格!'
        }
      );
      return ;
    }

    const data: NineTeenUpdatePrice[] = this.getNineTeenUpdatePrice(products);

    this.updateLoading = true;
    this.postUpdatePrice(data).subscribe((result: MeeResult) => {
      this.updateLoading = false;

      if (result.statusCode === 0) {
        this.message.success('更新成功!');
        this.loadProducts();
      } else {
        this.message.error('更新失败');
      }
    });

  }

  getNineTeenUpdatePrice(products: NineTeenGoods[]): NineTeenUpdatePrice[] {
    const updateProducts: NineTeenUpdatePrice[] = [];
    for (const item of products) {
        const skuInfo: NineTeenUpdateSku = {
          skuId: item.skuId,
          skuPrice: item.newPrice,
          firstLevel: item.newFirstPrice ? item.newFirstPrice : null,
          secondLevel: item.newSecondLevel ? item.newSecondLevel : null,
          thirdLevel: item.newThirdLevel ? item.newThirdLevel : null,
          fourthLevel: item.newFourthLevel ? item.newFourthLevel : null,
          fifthLevel: item.newFifthLevel ? item.newFifthLevel : null,
          sixthLevel: item.newSixthLevel ? item.newSixthLevel : null
        };

        if (updateProducts.filter(product => product.goodCode === item.goodCode).length <= 0) {
          const p: NineTeenUpdatePrice = {
            goodCode: item.goodCode,
            skuInfos: [skuInfo]
          };
          updateProducts.push(p);
        } else {
          updateProducts.filter(product => product.goodCode === item.goodCode).forEach(i => i.skuInfos.push(skuInfo));
      }
    }


    return updateProducts;
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  postUpdatePrice(data: NineTeenUpdatePrice[]) {
    const url = this.nineTeenUpdateProductUrl + '/' + this.platformId;
    return this.http.post(url, data);
  }

}
