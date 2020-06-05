import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceOcrComponent } from './pages/invoice-ocr/invoice-ocr.component';
import { InvoiceIndexComponent } from './pages/invoice-ocr/invoice-index/invoice-index.component';
import { LoginComponent } from './pages/login/login.component';
import { WeimobAuthComponent } from './pages/weimob-auth/weimob-auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'invoice/:bizid/:time/:nonce/:sign', component: InvoiceOcrComponent},
  { path: 'invoiceocr/:bizid/:time/:nonce/:sign', component: InvoiceIndexComponent},
  { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule)},
  { path: 'dashboard/:bizid/:userid/:time/:nonce/:sign', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'weimob', component: WeimobAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
