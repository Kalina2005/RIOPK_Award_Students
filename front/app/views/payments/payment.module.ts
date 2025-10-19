import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { Payments } from './payments/payments';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    Payments,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
