import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { InvoiceComponent, MeeResult, OcrData, MeeProduct, OCRProduct } from '../../../interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-invoice-confirm',
  templateUrl: './invoice-confirm.component.html',
  styleUrls: ['./invoice-confirm.component.less']
})

export class InvoiceConfirmComponent implements OnInit, InvoiceComponent {
  @Input() data: any;
  @Output() callback = new EventEmitter<any>();

  previewImage: string[];
  fileType: string;
  validateForm: FormGroup;
  editId: string | undefined = '';
  ocrData: OcrData;
  i = 0;
  listOfData: OCRProduct[] = [];
  totaldata = 0;
  supplierVo: any;

  supplierUrl = null;
  selectedValue = null;

  isLoading = false;
  previewVisible = false;

  isCollapsed = false;

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };

  submitJson: string;

  @ViewChild(NzInputDirective, { read: ElementRef }) inputElement: ElementRef;


  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private msg: NzMessageService,
              private notifiction: NzNotificationService,
              private route: ActivatedRoute) {
    this.supplierUrl = environment.supplierUrl;
  }

  ngOnInit() {
    const images = [];
    if (this.data.img != null && this.data.img.length > 0) {
      this.fileType = this.data.img[0].type;
      this.data.img.forEach ((file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // reader.readAsArrayBuffer(file);
        reader.onload = function(e) {
          const urlData = this.result;
          images.push(urlData);
        };
      });
      this.previewImage = images;
    } else {
      this.isCollapsed = true;
    }
    this.ocrData = this.data.ocrData;
    this.validateForm = this.fb.group({
      invoiceNo: [null, [Validators.required]],
      invoiceDate: [null, [Validators.required]]
    });

    this.ocrData.products.forEach((item) => {
      this.listOfData.push({ id: this.i,
        content: item.content,
        price: item.price,
        num: item.num,
        sku: item.sku,
        meename: ''
      });
      this.i++;
    });

    this.totaldata = this.listOfData.length;
    this.loadSupplier();
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  startEdit(id: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.editId = id;
  }

  getSupplier() {
    const bizid = this.route.snapshot.paramMap.get('bizid');
    const params = new HttpParams();
    params.set('bizId', bizid);

    const httpOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
    };

    const body = 'bizId=' + bizid;

    return this.http.post(this.supplierUrl, body, httpOptions);
  }

  loadSupplier() {
    this.getSupplier().subscribe ((result: MeeResult) => {
      if ( result.statusCode === 0) {
          this.supplierVo = result.data;
      } else {
          this.msg.error('Supplier load error!');
      }
    } );
  }

  matchNames() {
    const names = [];
    this.listOfData.forEach((item) => {
      names.push(item.content);
    });

    return this.http.post(environment.matchUrl, {name: names}, this.getHeaderOptions());
  }

  loadMatchNames() {
    this.isLoading = true;
    this.matchNames().subscribe ((result: MeeResult) => {
      if ( result.statusCode === 0) {
        const skus: MeeProduct [] = result.data;
        for (let i = 0 ; i < skus.length; i++) {
            const product = skus[i];
            this.listOfData[i].sku = product.code;
            this.listOfData[i].meename = product.name;
          }
      } else {
          this.msg.error('Matching error!');
      }
      this.isLoading = false;
    } );
  }

  updateInventory(data) {
    return this.http.post(environment.upateInventoryUrl, data, this.getHeaderOptions());
  }

  getHeaderOptions() {
    const bizid = this.route.snapshot.paramMap.get('bizid');
    const time = this.route.snapshot.paramMap.get('time');
    const nonce = this.route.snapshot.paramMap.get('nonce');
    const sign = this.route.snapshot.paramMap.get('sign');

    const httpOptions = {
      headers: new HttpHeaders({
        bizId: bizid,
        time,
        nonce,
        sign
      })
    };
    return httpOptions;
  }

  loadupdateInventory(data) {
    this.isLoading = true;
    this.updateInventory(data).subscribe ((result: MeeResult) => {
      if (result && result.statusCode === 0) {
        this.callback.emit(result);
      } else {
        this.notifiction.error('提交失败', result.data, { nzDuration: 0 });
      }
      this.isLoading = false;
    } );
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: Number(`${this.i}`),
        content: '',
        price: 0,
        num: 0,
        sku: '',
        meename: ''
      }
    ];
    this.i++;
  }

  deleteRow(id: number): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  handlePreview() {
    this.previewVisible = true;
  }


  submit(data: any) {
    if (!this.checkPrice(data)) {
        return;
    }

    const newData = [];
    data.forEach((item) => {
      const d: any = {};
      d.sku = item.sku;
      d.price = item.price;
      d.num = item.num;
      newData.push(d);
    });
    this.ocrData.purchaser = this.selectedValue;
    this.ocrData.products = newData;
    this.loadupdateInventory(this.ocrData);
  }

  gst() {
    const data = JSON.parse(JSON.stringify(this.listOfData));
    data.forEach((item) => {
      item.price = this.getGstPrice(item.price);
    });

    this.submit(data);
  }

  getGstPrice(price: number) {
    if (price <= 0) {
      return price;
    }
    price = price / (1.15);
    return price.toFixed(2);
  }

  checkPrice(data: any) {
    const error: string[] = [];
    for (const item of data) {
      if (item.price <= 0 || item.num <= 0 || item.sku === '') {
        const name: string = item.content;
        const price: number = item.price;
        error.push(name);
      }
    }

    if (error.length > 0) {
      this.notifiction.error('请检查商品SKU、数量、价格', error.join('\n'), { nzDuration: 0 });
      return false;
    } else {
      return true;
    }

  }

}
