import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentService} from "../../../shared/services/payment.service";
import {PaymentsType} from "../../../../types/payments.type";
import {AuthService} from "../../../core/auth/auth.service";
import { FormControl, FormGroup } from "@angular/forms";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-students',
  templateUrl: './payments.html',
  styleUrls: ['./payments.scss']
})
export class Payments implements OnInit {
  isAccountant: boolean = false;
  isDean: boolean = false;
  isStudent: boolean = false;
  payments: PaymentsType[] = [];
  dateFilterForm: FormGroup;

  months = [
    { id: 1, name: 'Январь' },
    { id: 2, name: 'Февраль' },
    { id: 3, name: 'Март' },
    { id: 4, name: 'Апрель' },
    { id: 5, name: 'Май' },
    { id: 6, name: 'Июнь' },
    { id: 7, name: 'Июль' },
    { id: 8, name: 'Август' },
    { id: 9, name: 'Сентябрь' },
    { id: 10, name: 'Октябрь' },
    { id: 11, name: 'Ноябрь' },
    { id: 12, name: 'Декабрь' }
  ];

  years: number[] = [];
  currentDate = new Date();

  editingPaymentId: string | null = null;
  statusOptions = ['Оплачено', 'Не оплачено'];

  constructor(private paymentService: PaymentService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
    this.isAccountant = this.authService.getIsAccountantIn();
    this.isDean = this.authService.getIsDeanIn();
    this.isStudent = !this.isAccountant && !this.isDean;

    const currentYear = this.currentDate.getFullYear();
    for (let year = 2020; year <= currentYear + 1; year++) {
      this.years.push(year);
    }

    this.dateFilterForm = new FormGroup({
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  isOverdue(payment: PaymentsType): boolean {
    if (payment.status === 'Оплачено') return false;

    const paymentDate = new Date(payment.paymentDate);
    console.log('paymentDate', paymentDate);
    const today = new Date();
    return paymentDate < today;
  }

  deletePayment(paymentId: string): void {
    if (confirm('Вы уверены, что хотите удалить эту выплату?')) {
      this.paymentService.deletePayment(paymentId)
        .subscribe({
          next: () => {
            this.payments = this.payments.filter(m => m.id !== paymentId);
            this._snackBar.open('Выплата удалена успешно');
          },
          error: (error) => {
            this._snackBar.open('Ошибка при удалении выплаты');
            console.error('Delete error:', error);
          }
        });
    }
  }

  loadPayments(): void {
    if (this.isAccountant || this.isDean) {
      this.paymentService.getPayments()
        .subscribe((data: PaymentsType[]) => {
          this.payments = data.filter(payment => payment !== null);
        });
    } else {
      this.paymentService.getPaymentsMy()
        .subscribe((data: PaymentsType[]) => {
          this.payments = data.filter(payment => payment !== null);
        });
    }
  }

  startEditStatus(payment: PaymentsType): void {
    this.editingPaymentId = payment.id;
  }

  saveStatus(payment: PaymentsType, newStatus: string): void {
    if (!this.isAccountant) {
      this._snackBar.open('Недостаточно прав для изменения статуса');
      return;
    }

    const updatedPayment = { ...payment, status: newStatus };

    this.paymentService.updatePaymentStatus(payment.id, newStatus)
      .subscribe({
        next: () => {
          payment.status = newStatus;
          this.editingPaymentId = null;
          this._snackBar.open('Статус обновлен');
        },
        error: (error) => {
          this._snackBar.open('Ошибка при обновлении статуса');
          console.error('Update error:', error);
        }
      });
  }

  cancelEdit(): void {
    this.editingPaymentId = null;
  }

  loadPaymentsWithFilter(): void {
    const formValue = this.dateFilterForm.value;

    if (formValue.month && formValue.year) {
      if (this.isAccountant || this.isDean) {
        this.paymentService.getPayments(formValue.month, formValue.year)
          .subscribe({
            next: (data: PaymentsType[]) => {
              this.payments = data.filter(payment => payment !== null);
            },
            error: (error) => {
              this._snackBar.open('Ошибка при загрузке выплат');
              console.error('Payment filter error:', error);
            }
          });
      } else {
        this.paymentService.getPaymentsMy(formValue.month, formValue.year)
          .subscribe({
            next: (data: PaymentsType[]) => {
              this.payments = data.filter(payment => payment !== null);
            },
            error: (error) => {
              this._snackBar.open('Ошибка при загрузке выплат');
              console.error('Payment filter error:', error);
            }
          });
      }
    } else {
      this.loadPayments();
    }
  }

  clearDateFilter(): void {
    this.dateFilterForm.patchValue({
      month: '',
      year: ''
    });
    this.loadPayments();
  }

  getSelectedMonthName(): string {
    const monthId = this.dateFilterForm.get('month')?.value;
    const month = this.months.find(m => m.id === monthId);
    return month ? month.name : 'Месяц';
  }

  getSelectedYear(): number {
    return this.dateFilterForm.get('year')?.value;
  }
}
