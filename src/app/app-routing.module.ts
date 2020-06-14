import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceOcrComponent } from './pages/invoice-ocr/invoice-ocr.component';
import { InvoiceIndexComponent } from './pages/invoice-ocr/invoice-index/invoice-index.component';
import { LoginComponent } from './pages/login/login.component';
import { WeimobAuthComponent } from './pages/weimob-auth/weimob-auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IframeComponent } from './pages/iframe/iframe.component';
import { BizlistComponent } from './pages/bizlist/bizlist.component';
import { BizmenuComponent } from './pages/bizmenu/bizmenu.component';
import { RolelistComponent } from './pages/rolelist/rolelist.component';
import { RoleuserComponent } from './pages/roleuser/roleuser.component';
import { MenulistComponent } from './pages/menulist/menulist.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuService } from './pages/menu/menu.service';
import { FlywaySettingComponent } from './pages/flyway-setting/flyway-setting.component';
import { NewsEditerComponent } from './pages/news-editer/news-editer.component';
import { NewsListComponent } from './pages/news-list/news-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'invoice/:bizid/:time/:nonce/:sign', component: InvoiceOcrComponent},
  { path: 'invoiceocr/:bizid/:time/:nonce/:sign', component: InvoiceIndexComponent},
  { path: 'menu/:id', component: MenuComponent},
  { path: 'dashboard/:bizid/:userid/:time/:nonce/:sign', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'weimob', component: WeimobAuthComponent, canActivate: [MenuService]},
  { path: 'iframe', component: IframeComponent },
  { path: 'bizlist', component: BizlistComponent, canActivate: [MenuService]},
  { path: 'bizmenu', component: BizmenuComponent, canActivate: [MenuService]},
  { path: 'rolelist', component: RolelistComponent, canActivate: [MenuService]},
  { path: 'rolemanage', component: RoleuserComponent, canActivate: [MenuService]},
  { path: 'list', component: MenulistComponent, canActivate: [MenuService]},
  { path: 'flyway/setting', component: FlywaySettingComponent, canActivate: [MenuService]},
  { path: 'news/edit/:id', component: NewsEditerComponent},
  { path: 'news/list', component: NewsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
