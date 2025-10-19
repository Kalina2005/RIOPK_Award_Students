import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpErrorResponse} from "@angular/common/http";
import {ApplicationType} from "../../../../types/application.type";
import {ApplicationService} from "../../../shared/services/application.service";

@Component({
  selector: 'app-students',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.scss']
})
export class ApplicationCreateComponent implements OnInit {
  requestForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private applicationService: ApplicationService
  ) {
    this.requestForm = this.createForm();
    this.generateYears();
  }

  ngOnInit(): void {}

  createForm(): FormGroup {
    return this.fb.group({
      month: [null, Validators.required],
      year: [null, Validators.required],
      file: [null, Validators.required]
    });
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 2; year <= currentYear + 1; year++) {
      this.years.push(year);
    }
  }

  generateRequestNumber(): string {
    const timestamp = new Date().getTime();
    return `RS-${timestamp}`;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.validateAndSetFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.validateAndSetFile(files[0]);
    }
  }

  validateAndSetFile(file: File): void {
    if (file.type !== 'application-create/pdf') {
      this.snackBar.open('Пожалуйста, выберите файл в формате PDF', 'Закрыть', {
        duration: 5000
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      this.snackBar.open('Размер файла не должен превышать 10MB', 'Закрыть', {
        duration: 5000
      });
      return;
    }

    this.selectedFile = file;
    this.requestForm.patchValue({ file });
    this.requestForm.get('file')?.updateValueAndValidity();
  }

  removeFile(): void {
    this.selectedFile = null;
    this.requestForm.patchValue({ file: null });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.requestForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.requestForm.valid && this.selectedFile) {
      this.isSubmitting = true;

      const formData: ApplicationType = {
        month: this.requestForm.value.month,
        year: this.requestForm.value.year,
      };

      this.applicationService.createApplication(formData).subscribe({
        next: () => {
          this.snackBar.open('Заявка успешно отправлена');
          this.resetForm();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.snackBar.open('Ошибка отправки');
        }
      });
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  resetForm(): void {
    this.requestForm.reset();
    this.selectedFile = null;
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.requestForm.controls).forEach(key => {
      this.requestForm.get(key)?.markAsTouched();
    });
  }
}
