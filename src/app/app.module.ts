import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceOcrComponent } from './pages/invoice-ocr/invoice-ocr.component';
import { UpdateFileComponent } from './pages/update-file/update-file.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';
import { InvoiceStepHostDirective } from './pages/invoice-ocr/invoice-step-host.directive';
import { InvoiceConfirmComponent } from './pages/invoice-confirm/invoice-confirm.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    InvoiceOcrComponent,
    UpdateFileComponent,
    InvoiceConfirmComponent,
    InvoiceStepHostDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  entryComponents: [ UpdateFileComponent, InvoiceConfirmComponent ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
