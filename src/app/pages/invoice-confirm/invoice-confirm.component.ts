import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { InvoiceComponent, MeeResult, OcrData } from '../../interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzInputDirective, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-invoice-confirm',
  templateUrl: './invoice-confirm.component.html',
  styleUrls: ['./invoice-confirm.component.less']
})

export class InvoiceConfirmComponent implements OnInit, InvoiceComponent {
  @Input() data: any;
  @Output() callback = new EventEmitter<any>();
  previewImage: string | undefined = '';
  validateForm: FormGroup;
  editId: string | undefined = '';
  ocrData: OcrData;
  i = 0;
  listOfData: any[] = [];
  totaldata = 0;
  supplierVo: any;

  supplierUrl = null;
  selectedValue = null;

  isLoading = false;
  previewVisible = false;
  isVisible = false;

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };

  submitJson: string;

  @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;


  constructor(private fb: FormBuilder, private http: HttpClient, private msg: NzMessageService) {
    this.supplierUrl = environment.supplierUrl;
  }

  ngOnInit() {
    this.previewImage = this.data.img;
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
        sku: item.sku});
      this.i++;
    });

    this.totaldata = this.listOfData.length;
    this.loadSupplier();
  }

  onSubmit() {
    this.callback.emit();
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
    return this.http.get(this.supplierUrl);
  }

  loadSupplier() {
    this.getSupplier().subscribe ((result: MeeResult) => {
      if ( result.statusCode === 0) {
          console.log(result.data);
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

    return this.http.post(environment.matchUrl, {name: names});
  }

  loadMatchNames() {
    this.isLoading = true;
    this.matchNames().subscribe ((result: MeeResult) => {
      if ( result.statusCode === 0) {
        const skus: string [] = result.data;
        for (let i = 0 ; i < skus.length; i++) {
            const sku = skus[i];
            this.listOfData[i].sku = sku;
          }
      } else {
          this.msg.error('Supplier load error!');
      }
      this.isLoading = false;
    } );
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        content: '',
        price: 0,
        num: 0,
        sku: ''
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  handlePreview() {
    this.previewVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submit() {
    this.ocrData.purchaser = this.selectedValue;
    this.ocrData.products = this.listOfData;
    this.submitJson = JSON.stringify(this.ocrData);
    this.isVisible = true;
  }

  gst() {
    this.listOfData.forEach((item) => {
      item.price = this.getGstPrice(item.price);
    });

    this.submit();
  }

  getGstPrice(price: number) {
    if (price <= 0) {
      return price;
    }
    price = price / (1.15);
    return price;
  }

}
