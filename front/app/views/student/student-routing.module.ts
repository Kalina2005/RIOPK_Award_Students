import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentsComponent} from "./students/students.component";
import {StudentComponent} from "./student/student.component";
import {StudentEditComponent} from "./student-edit/student-edit.component";

const routes: Routes = [
  {path: 'students', component: StudentsComponent},
  {path: 'students/:id', component: StudentComponent},
  {path: 'students/edit/:id', component: StudentEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
