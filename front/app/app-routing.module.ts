import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { AuthForwardGuard } from './core/auth/auth-forward.guard';
import {LayoutComponent} from "./shared/layout/layout.component";
import {AuthGuard} from "./core/auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
    canActivate: [AuthForwardGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
        canActivate: [AuthForwardGuard]
      },
      {path: '', loadChildren: () => import('./views/account/account.module').then(m => m.AccountModule)},
      {path: '', loadChildren: () => import('./views/student/student.module').then(m => m.StudentModule)},
      {path: '', loadChildren: () => import('./views/payments/payment.module').then(m => m.PaymentModule)},
      {path: '', loadChildren: () => import('./views/applications/applications.module').then(m => m.ApplicationsModule)},
      {path: '', loadChildren: () => import('./views/stipends/stipends.module').then(m => m.StipendsModule)},
      {path: 'dashboard',       component: DashboardComponent},
      {path: 'dialog',          component: ConfirmDialogComponent},
    ]
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
