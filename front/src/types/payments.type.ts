export type PaymentsType = {
  id: string,
  paymentName: string,
  totalAmount: number,
  paymentDate: string,
  status: string;
  studentPayments: StudentPaymentType[],

  month?: number;
  year?: number;
}

export type StudentPaymentType = {
  id: string,
  studentId: number,
  studentName: string,
  amount: number
}
