import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { OcrResult, InvoiceComponent, OcrData, MeeResult } from '../../interface';
import { InvoiceStepHostDirective } from './invoice-step-host.directive';
import { InvoiceItem } from './invoice-item';
import { UpdateFileComponent } from './update-file/update-file.component';
import { InvoiceResultComponent } from './invoice-result/invoice-result.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { InvoiceConfirmComponent } from './invoice-confirm/invoice-confirm.component';
import { InvoiceConfirmData } from './invoice-confirm/invoice-confirm-data';



@Component({
  selector: 'app-invoice-ocr',
  templateUrl: './invoice-ocr.component.html',
  styleUrls: ['./invoice-ocr.component.css']
})

export class InvoiceOcrComponent implements OnInit, OnDestroy  {
  current = 0;

  status = 'process';

  invoiceItems: InvoiceItem[];

  data: any;

  size = 'large';

  bizid: string; time: string; nonce: string; sign: string;

  isSpinning = true;

  @ViewChild(InvoiceStepHostDirective, {static: true})
      invoiceStepHostDirective: InvoiceStepHostDirective;

  constructor(private msg: NzMessageService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private http: HttpClient,
              private titleService: Title
    ) { }

  ngOnInit() {
    this.paramInit();
    this.invoiceItems = this.getItems();
    this.initAuth();
    this.titleService.setTitle('Invoice OCR');
  }

  paramInit() {
    this.bizid = this.route.snapshot.paramMap.get('bizid');
    this.time = this.route.snapshot.paramMap.get('time');
    this.nonce = this.route.snapshot.paramMap.get('nonce');
    this.sign = this.route.snapshot.paramMap.get('sign');
  }

  ngOnDestroy(): void {
  }

  loadComponent() {
    const invoiceItem = this.invoiceItems[this.current];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(invoiceItem.component);
    const viewContainerRef = this.invoiceStepHostDirective.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as InvoiceComponent).data = this.data;
    if (componentRef.instance instanceof UpdateFileComponent) {
      console.log('UpdateFileComponent');
      (componentRef.instance as InvoiceComponent).callback.subscribe((ocrResult: any) => {
        console.log('UpdateFileComponent callback', ocrResult);
        this.updateDone(ocrResult);
      });
    } else if (componentRef.instance instanceof InvoiceConfirmComponent) {
      console.log('InvoiceConfirmComponent');
      (componentRef.instance as InvoiceComponent).callback.subscribe((ocrResult: any) => {
        console.log('InvoiceConfirmComponent callback', ocrResult);
        this.comformDone(ocrResult);
      });
    } else if (componentRef.instance instanceof InvoiceResultComponent) {
      console.log('InvoiceResultComponent');
      (componentRef.instance as InvoiceComponent).callback.subscribe((ocrResult: any) => {
        // this.comformDone(ocrResult);
      });
    }
  }


  updateDone(ocrResult: OcrResult) {
    const meeResult = ocrResult.meeResult;
    if (meeResult.statusCode === 0) {
      const ocrData: OcrData = meeResult.data;
      const image = ocrResult.img;
      const confirmData = new InvoiceConfirmData();
      confirmData.img = image;
      confirmData.ocrData = ocrData;
      this.data = confirmData;
      this.next();
    } else {
      this.status = 'error';
    }
  }

  comformDone(ocrResult: MeeResult) {
      this.data = ocrResult;
      this.next();
  }

  submitDone() {

  }

  getItems() {
      return [
          new InvoiceItem(UpdateFileComponent, this.data),
          new InvoiceItem(InvoiceConfirmComponent, this.data),
          new InvoiceItem(InvoiceResultComponent, null)
      ];
  }

  next() {
    this.current ++;
    this.loadComponent();
  }

  back() {
    this.current --;
    this.loadComponent();
  }

  setStep(current) {
    this.current = current;
    this.loadComponent();
  }


  checkAuth() {
      return this.http.post(environment.authUrl,
        { bizId : this.bizid, time : this.time, nonce : this.nonce, sign : this.sign});
  }

  getSupplier() {
  }

  initAuth() {
    this.checkAuth().subscribe ((result: MeeResult) => {
      this.data = result;
      if ( result.statusCode === 0) {
        this.isSpinning = false;
        this.setStep(0);
      } else {
          // this.msg.error('Login failed. Please login again!');
        this.isSpinning = false;
        this.data.data = '账号异常,请重新登录！';
        this.setStep(2);
      }
    } );
  }
}
