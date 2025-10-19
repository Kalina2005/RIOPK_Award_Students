import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentService} from "../../../shared/services/student.service";
import {DeanStudentsType} from "../../../../types/dean-students.type";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {DefaultResponseType} from "../../../../types/default-response.type";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentEditComponent implements OnInit {
  studentForm!: FormGroup;
  isLoading: boolean = true;
  studentId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.studentId = params['id'];
      this.loadStudentData(this.studentId);
    });
  }

  private initForm(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      gpa: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      absencesHours: [0, [Validators.required, Validators.min(0)]],
      hasRetakes: [false, Validators.required],
      bonusAmount: [0, [Validators.required, Validators.min(0)]],
      stipendType: ['', Validators.required],
    });
  }

  private loadStudentData(id: string): void {
    this.studentService.getStudent(id).subscribe({
      next: (data: DeanStudentsType) => {
        this.studentForm.patchValue({
          name: data.name || '',
          gpa: data.gpa || 0,
          absencesHours: data.absencesHours || 0,
          hasRetakes: data.hasRetakes || false,
          bonusAmount: data.bonusAmount || 0,
          stipendType: data.stipendType || '',
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки данных студента:', error);
        this._snackBar.open('Ошибка загрузки данных студента');
        this.isLoading = false;
      }
    });
  }

  editStudent(): void {
    if (this.studentForm.valid && this.studentId) {
      const studentData: DeanStudentsType = {
        id: this.studentId,
        ...this.studentForm.value
      };

      this.studentService.updateStudent(this.studentId, studentData).subscribe({
        next: (data) => {
          if (this.isDefaultResponseType(data)) {
            if (data.status === 400) {
              this._snackBar.open(data.message || 'Ошибка обновления');
              return;
            }
          }

          this._snackBar.open('Студент успешно обновлен');
        },
        error: (errorResponse: HttpErrorResponse) => {
          this._snackBar.open(errorResponse.error?.message || 'Ошибка обновления');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private isDefaultResponseType(data: any): data is DefaultResponseType {
    return data && typeof data === 'object' && 'status' in data;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach(key => {
      this.studentForm.get(key)?.markAsTouched();
    });
  }
}
