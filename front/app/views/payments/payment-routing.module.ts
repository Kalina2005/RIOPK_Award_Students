import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Payments} from "./payments/payments";
import {PaymentComponent} from "./payment/payment.component";

const routes: Routes = [
  {path: 'payments', component: Payments},
  {path: 'payments/:id', component: PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
