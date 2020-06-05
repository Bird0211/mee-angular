import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { OcrResult, InvoiceComponent, OcrData, MeeResult, AuthParam } from '../../interface';
import { InvoiceStepHostDirective } from './invoice-step-host.directive';
import { InvoiceItem } from './invoice-item';
import { UpdateFileComponent } from './update-file/update-file.component';
import { InvoiceResultComponent } from './invoice-result/invoice-result.component';
import { Title } from '@angular/platform-browser';
import { InvoiceConfirmComponent } from './invoice-confirm/invoice-confirm.component';
import { InvoiceConfirmData } from './invoice-confirm/invoice-confirm-data';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  isSpinning = true;

  @ViewChild(InvoiceStepHostDirective, {static: true})

  invoiceStepHostDirective: InvoiceStepHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private titleService: Title,
              private route: ActivatedRoute,
              private http: HttpClient,
              private authService: AuthService
    ) { }

  ngOnInit() {
    this.invoiceItems = this.getItems();

    const authParam: AuthParam = this.authService.getAuthParam(this.route);
    this.authService.initAuth(authParam).then((result: boolean) => {
      this.data = {
        statusCode: 0,
        description: null,
        data: null,
      };
      if (result) {
        this.isSpinning = false;
        this.setStep(0);
      } else {
          // this.msg.error('Login failed. Please login again!');
        this.isSpinning = false;
        this.data.data = '账号异常,请重新登录！';
        this.data.statusCode = 1;
        this.setStep(2);
      }
    });

    this.titleService.setTitle('Invoice OCR');
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
      (componentRef.instance as InvoiceComponent).callback.subscribe((ocrResult: any) => {
        this.updateDone(ocrResult);
      });
    } else if (componentRef.instance instanceof InvoiceConfirmComponent) {
      (componentRef.instance as InvoiceComponent).callback.subscribe((ocrResult: any) => {
        this.comformDone(ocrResult);
      });
    } else if (componentRef.instance instanceof InvoiceResultComponent) {
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

  setStep(current: number) {
    this.current = current;
    this.loadComponent();
  }

  getSupplier() {
  }

}
