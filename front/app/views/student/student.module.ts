import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentsComponent } from './students/students.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StudentComponent } from './student/student.component';
import {StudentEditComponent} from "./student-edit/student-edit.component";


@NgModule({
  declarations: [
    StudentsComponent,
    StudentComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
