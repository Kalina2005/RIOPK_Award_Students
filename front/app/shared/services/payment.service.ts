import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PaymentsType} from "../../../types/payments.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {StipendsType} from "../../../types/stipends.type";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getPayments(month?: number, year?: number): Observable<PaymentsType[]> {
    let params = new HttpParams();

    if (month) params = params.set('month', month.toString());
    if (year) params = params.set('year', year.toString());

    return this.http.get<PaymentsType[]>(environment.api + 'payments', {params});
  }

  getPaymentsMy(month?: number, year?: number): Observable<PaymentsType[]> {
    let params = new HttpParams();

    if (month) params = params.set('month', month.toString());
    if (year) params = params.set('year', year.toString());

    return this.http.get<PaymentsType[]>(environment.api + 'payments/my', {params});
  }

  getPayment(url: string): Observable<PaymentsType> {
    return this.http.get<PaymentsType>(environment.api + 'payments/' + url);
  }

  filterPaymentsByDate(month: number, year: number): Observable<PaymentsType[]> {
    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());

    return this.http.get<PaymentsType[]>(environment.api + 'payments/filter', { params });
  }

  deletePayment(paymentId: string): Observable<PaymentsType | DefaultResponseType> {
    return this.http.delete<PaymentsType | DefaultResponseType>(environment.api + 'payments/' + paymentId);
  }

  updatePaymentStatus(paymentId: string, status: string): Observable<any> {
    const params = new HttpParams().set('status', status);
    return this.http.put(environment.api + 'payments/' + paymentId + '/status', {}, { params });
  }

  studentPayments(): Observable<PaymentsType> {
    return this.http.get<PaymentsType>(environment.api + 'payments/my');
  }

  paymentsCalculate(): Observable<StipendsType> {
    return this.http.post<StipendsType>(
      `${environment.api}payments/calculate`,
      {}
    );
  }
}
