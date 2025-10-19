import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentService} from "../../../shared/services/payment.service";
import {PaymentsType} from "../../../../types/payments.type";
import {DeanStudentsType} from "../../../../types/dean-students.type";

@Component({
  selector: 'app-student',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  payment: PaymentsType;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private paymentService: PaymentService) {
    this.payment = {
      id: '',
      paymentName: '',
      totalAmount: 0,
      paymentDate: '',
      status: '',
      studentPayments: [],
    }
  }

  ngOnInit(): void {
    this.loadPayment();
  }

  loadPayment(): void {
    this.activatedRoute.params.subscribe(params => {
      this.paymentService.getPayment(params['id']).subscribe((data: PaymentsType) => {
        this.payment = data;
      });
    });
  }

}
