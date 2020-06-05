import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceOcrComponent } from './pages/invoice-ocr/invoice-ocr.component';
import { UpdateFileComponent } from './pages/invoice-ocr/update-file/update-file.component';
import { InvoiceResultComponent } from './pages/invoice-ocr/invoice-result/invoice-result.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
// import en from '@angular/common/locales/en';
import { InvoiceStepHostDirective } from './pages/invoice-ocr/invoice-step-host.directive';
import { InvoiceConfirmComponent } from './pages/invoice-ocr/invoice-confirm/invoice-confirm.component';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserComponent } from './pages/user/user.component';
import { InvoiceIndexComponent } from './pages/invoice-ocr/invoice-index/invoice-index.component';
import { MenuModule } from './pages/menu/menu.module';
import { LoginComponent } from './pages/login/login.component';
import { WeimobAuthComponent } from './pages/weimob-auth/weimob-auth.component';
import { SiderComponent } from './pages/sider/sider.component';
import { HeaderComponent } from './pages/header/header.component';

// 支持AOT
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    InvoiceOcrComponent,
    UpdateFileComponent,
    InvoiceConfirmComponent,
    InvoiceResultComponent,
    InvoiceIndexComponent,
    InvoiceStepHostDirective,
    UserComponent,
    LoginComponent,
    WeimobAuthComponent,
    SiderComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NzSpaceModule,
    ReactiveFormsModule,
    PdfViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [ UpdateFileComponent, InvoiceConfirmComponent, InvoiceResultComponent ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
