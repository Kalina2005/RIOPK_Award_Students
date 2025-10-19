import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentService} from "../../../shared/services/student.service";
import {DeanStudentsType} from "../../../../types/dean-students.type";
import {Student} from "../../../shared/components/modal/student";
import {AuthService} from "../../../core/auth/auth.service";
import {PaymentService} from "../../../shared/services/payment.service";
import {StipendsType} from "../../../../types/stipends.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  isDean: boolean = false;
  searchField = new FormControl();
  students: DeanStudentsType[] = [];
  allFilterChecked = false;
  searchFilterOptions = [
    {
      id: "hasNoRetakes",
      value: "Нет пересдач",
      checked: false
    },
    {
      id: "lessThan11AbsenceHours",
      value: "Меньше 11 часов пропуска",
      checked: false
    },
    {
      id: "gpaNotLowerThan5",
      value: "Средний балл не ниже 5",
      checked: false
    },
  ];

  constructor(private deanStudentService: StudentService,
              private authService: AuthService,
              private paymentService: PaymentService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.isDean = this.authService.getIsDeanIn();
  }

  ngOnInit(): void {
    this.loadStudents();

    this.searchField.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        if (value && value.length > 0) {
          this.deanStudentService.searchStudent(value)
            .subscribe({
              next: (data: DeanStudentsType[]) => {
                this.students = data.filter(student => student !== null);
              },
              error: (error: HttpErrorResponse) => {
                if (error.status === 404) {
                  this.students = [];
                } else {
                  this._snackBar.open('Произошла ошибка при поиске');
                }
              }
            });
        } else {
          this.loadStudents();
        }
      });
  }

  loadStudents() {
    this.deanStudentService.getStudents()
      .subscribe((data: DeanStudentsType[]) => {
        this.students = data.filter(student => student !== null);
      });
  }

  loadStudentsWithFilters() {
    const activeFilters: any = {};
    this.searchFilterOptions.forEach(filter => {
      activeFilters[filter.id] = filter.checked;
    });

    const hasActiveFilters = this.searchFilterOptions.some(filter => filter.checked);

    if (hasActiveFilters) {
      this.deanStudentService.filterStudents(activeFilters)
        .subscribe({
          next: (data: DeanStudentsType[]) => {
            this.students = data.filter(student => student !== null);
          },
          error: (error: HttpErrorResponse) => {
            this._snackBar.open('Ошибка при применении фильтров');
          }
        });
    } else {
      this.loadStudents();
    }
  }

  checkOnFilter(item: any) {
    item.checked = !item.checked;
    this.loadStudentsWithFilters();
    console.log('Filter changed:', item);
  }

  clearAllFilters() {
    this.allFilterChecked = false;
    this.searchFilterOptions.forEach(item => item.checked = false);
    this.loadStudents();
  }

  paymentsCalculate() {
    this.paymentService.paymentsCalculate().subscribe({
      next: (data: StipendsType) => {
        this.router.navigate(['/payments']);
      },
      error: (error: HttpErrorResponse) => {
        this._snackBar.open('Возникла ошибка при расчете');
      }
    })
  }
}
