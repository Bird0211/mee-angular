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
import { LoginComponent } from './pages/login/login.component';
import { WeimobAuthComponent } from './pages/weimob-auth/weimob-auth.component';
import { SiderComponent } from './pages/sider/sider.component';
import { HeaderComponent } from './pages/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IframeComponent } from './pages/iframe/iframe.component';
import { MenuInfoComponent } from './pages/menu-info/menu-info.component';
import { BizlistComponent } from './pages/bizlist/bizlist.component';
import { BizmenuComponent } from './pages/bizmenu/bizmenu.component';
import { RolelistComponent } from './pages/rolelist/rolelist.component';
import { RoleuserComponent } from './pages/roleuser/roleuser.component';
import { MenutreeComponent } from './pages/menutree/menutree.component';
import { MenulistComponent } from './pages/menulist/menulist.component';
import { OrderFlowComponent } from './pages/order-flow/order-flow.component';
import { OrderFlowItemComponent } from './pages/order-flow-item/order-flow-item.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DataTodayComponent } from './pages/data-today/data-today.component';
import { DataTotalComponent } from './pages/data-total/data-total.component';
import { NewsComponent } from './pages/news/news.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewsEditerComponent } from './pages/news-editer/news-editer.component';
import { NewsListComponent } from './pages/news-list/news-list.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { PipeModule } from './pipe/pipe.module';
import { NewsListEditComponent } from './pages/news-list-edit/news-list-edit.component';
import { NineteenProductsComponent } from './pages/nineteen-products/nineteen-products.component';
import { DataOrderComponent } from './pages/data-order/data-order.component';
import { NgxEchartsModule } from 'ngx-echarts';

import * as echarts from 'echarts';
import { RefreshCacheComponent } from './pages/refresh-cache/refresh-cache.component';
import { TodoAllComponent } from './pages/todo-all/todo-all.component';
import { TodoAllTableComponent } from './pages/todo-all-table/todo-all-table.component';
import { TopProductComponent } from './pages/top-product/top-product.component';
import { TrademeComponent } from './pages/trademe/trademe.component';
import { TrademeAddButtonModule } from './pages/trademe/trademe-add-button/trademe-add-button/trademe-add-button.module';
import { NzcardModule } from './pages/nzcard/nzcard.module';
import { FlywaySettingComponent } from './pages/flyway-setting/flyway-setting.component';
import { BizSelectModule } from './pages/bizselect/biz-select.module';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule  } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

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
    HeaderComponent,
    DashboardComponent,
    IframeComponent,
    MenuInfoComponent,
    BizlistComponent,
    BizmenuComponent,
    RolelistComponent,
    RoleuserComponent,
    MenutreeComponent,
    MenulistComponent,
    OrderFlowComponent,
    OrderFlowItemComponent,
    MenuComponent,
    FlywaySettingComponent,
    DataTodayComponent,
    DataTotalComponent,
    NewsComponent,
    TodoListComponent,
    TodoAllComponent,
    TodoAllTableComponent,
    NewsEditerComponent,
    NewsListComponent,
    NewsDetailComponent,
    NewsListEditComponent,
    NineteenProductsComponent,
    DataOrderComponent,
    RefreshCacheComponent,
    TopProductComponent,
    TrademeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzSpaceModule,
    ReactiveFormsModule,
    PdfViewerModule,
    EditorModule,
    PipeModule,
    NzcardModule,
    BizSelectModule,
    NzModalModule,
    NzGridModule,
    NzListModule,
    NzRadioModule,
    NzDatePickerModule,
    NzTransferModule,
    NzButtonModule,
    NzTableModule,
    NzLayoutModule,
    NzStepsModule,
    NzSpinModule,
    NzUploadModule,
    NzSelectModule,
    NzDividerModule,
    NzInputNumberModule,
    NzPopoverModule,
    NzResultModule,
    NzAvatarModule,
    NzIconModule,
    NzBadgeModule,
    NzAlertModule,
    NzPopconfirmModule,
    NzCardModule,
    NzMenuModule,
    NzToolTipModule,
    NzTreeModule,
    NzDropDownModule,
    NzDrawerModule,
    NzInputModule,
    NzFormModule,
    NzEmptyModule,
    NzSkeletonModule,
    NzPaginationModule,
    NzTabsModule,
    NzMessageModule,
    TrademeAddButtonModule,
    NzNotificationModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
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
