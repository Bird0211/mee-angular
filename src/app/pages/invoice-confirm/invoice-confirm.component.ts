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
    for (const i in this.validateForm.controls) {
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
    this.ocrData.products.forEach((item) => {
      names.push(item.content);
    });

    return this.http.post(environment.matchUrl, {'name':names});
  }

  loadMatchNames() {
    this.matchNames().subscribe ((result: MeeResult) => {
      if ( result.statusCode === 0) {
          console.log(result.data);
          this.msg.info(result.data);
      } else {
          this.msg.error('Supplier load error!');
      }
    } );
  }


}
