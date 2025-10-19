import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface CalculationSheetRequest {
  id: string;
  requestNumber: string;
  studentName: string;
  studentGroup: string;
  studentEmail: string;
  month: number;
  year: number;
  createdDate: string;
  status: 'ожидает ответа' | 'в обработке' | 'закрыт' | 'отклонен';
  additionalInfo?: string;
  calculationSheetFile?: string;
  originalFile?: string;
}

@Component({
  selector: 'app-applications',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  requests: CalculationSheetRequest[] = [];
  filteredRequests: CalculationSheetRequest[] = [];

  // Фильтры
  selectedStatus: string = '';
  selectedMonth: number | null = null;
  selectedYear: number | null = null;
  searchTerm: string = '';

  // Пагинация
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  // Модальное окно
  selectedRequest: CalculationSheetRequest | null = null;
  newCalculationSheetFile: File | null = null;

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

  constructor(private snackBar: MatSnackBar) {
    this.generateYears();
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 2; year <= currentYear + 1; year++) {
      this.years.push(year);
    }
  }

  loadRequests(): void {
    // Загрузка данных с API
    // Временно используем мок-данные
    this.requests = this.getMockData();
    this.applyFilters();
  }

  getMockData(): CalculationSheetRequest[] {
    return [
      {
        id: '1',
        requestNumber: 'RS-123456',
        studentName: 'Иванов Иван Иванович',
        studentGroup: 'ИТ-21',
        studentEmail: 'ivanov@edu.ru',
        month: 9,
        year: 2024,
        createdDate: '2024-09-15',
        status: 'ожидает ответа',
        additionalInfo: 'Необходим расчетный лист для предоставления в банк'
      },
      {
        id: '2',
        requestNumber: 'RS-123457',
        studentName: 'Петрова Анна Сергеевна',
        studentGroup: 'ИТ-21',
        studentEmail: 'petrova@edu.ru',
        month: 9,
        year: 2024,
        createdDate: '2024-09-16',
        status: 'в обработке',
        additionalInfo: 'Для налоговой декларации'
      },
      {
        id: '3',
        requestNumber: 'RS-123458',
        studentName: 'Сидоров Алексей Петрович',
        studentGroup: 'ИТ-22',
        studentEmail: 'sidorov@edu.ru',
        month: 8,
        year: 2024,
        createdDate: '2024-08-20',
        status: 'закрыт',
        calculationSheetFile: '/assets/sheets/sheet-123458.pdf'
      }
    ];
  }

  applyFilters(): void {
    this.filteredRequests = this.requests.filter(request => {
      // Фильтр по статусу
      if (this.selectedStatus && request.status !== this.selectedStatus) {
        return false;
      }

      // Фильтр по месяцу
      if (this.selectedMonth && request.month !== this.selectedMonth) {
        return false;
      }

      // Фильтр по году
      if (this.selectedYear && request.year !== this.selectedYear) {
        return false;
      }

      // Поиск по ФИО студента
      if (this.searchTerm && !request.studentName.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  clearFilters(): void {
    this.selectedStatus = '';
    this.selectedMonth = null;
    this.selectedYear = null;
    this.searchTerm = '';
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilters();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ожидает ответа': return 'bg-warning text-dark';
      case 'в обработке': return 'bg-info text-white';
      case 'закрыт': return 'bg-success text-white';
      case 'отклонен': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'ожидает ответа': return 'bi bi-clock';
      case 'в обработке': return 'bi bi-hourglass-split';
      case 'закрыт': return 'bi bi-check-circle';
      case 'отклонен': return 'bi bi-x-circle';
      default: return 'bi bi-question-circle';
    }
  }

  getMonthName(month: number): string {
    const monthObj = this.months.find(m => m.id === month);
    return monthObj ? monthObj.name : '';
  }

  getRequestsCountByStatus(status: string): number {
    return this.requests.filter(request => request.status === status).length;
  }

  viewRequestDetails(request: CalculationSheetRequest): void {
    // Реализация просмотра деталей заявки
    console.log('Просмотр заявки:', request);
    this.snackBar.open(`Детали заявки ${request.requestNumber}`, 'Закрыть', {
      duration: 3000
    });
  }

  attachCalculationSheet(request: CalculationSheetRequest): void {
    this.selectedRequest = request;
    this.newCalculationSheetFile = null;
    // Открытие модального окна через Bootstrap JavaScript
    const modal = new (window as any).bootstrap.Modal(document.getElementById('attachSheetModal'));
    modal.show();
  }

  onCalculationSheetSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.newCalculationSheetFile = file;
    } else {
      this.snackBar.open('Пожалуйста, выберите файл в формате PDF', 'Закрыть', {
        duration: 5000
      });
    }
  }

  saveCalculationSheet(): void {
    if (this.selectedRequest && this.newCalculationSheetFile) {
      // Здесь API вызов для сохранения файла и обновления статуса
      this.selectedRequest.calculationSheetFile = URL.createObjectURL(this.newCalculationSheetFile);
      this.selectedRequest.status = 'закрыт';

      this.snackBar.open('Расчетный лист успешно прикреплен и заявка закрыта', 'Закрыть', {
        duration: 5000,
        panelClass: ['success-snackbar']
      });

      // Закрытие модального окна
      const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('attachSheetModal'));
      modal.hide();
    }
  }

  updateStatus(request: CalculationSheetRequest, newStatus: string): void {
    const oldStatus = request.status;
    request.status = newStatus as any;

    this.snackBar.open(`Статус заявки изменен с "${oldStatus}" на "${newStatus}"`, 'Закрыть', {
      duration: 5000
    });
  }

  // Пагинация
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRequests.length / this.pageSize);
  }

  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get paginatedRequests(): CalculationSheetRequest[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredRequests.slice(startIndex, startIndex + this.pageSize);
  }
}
