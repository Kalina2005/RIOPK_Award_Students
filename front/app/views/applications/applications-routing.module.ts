import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplicationCreateComponent} from "./application-create/application-create.component";
import {ApplicationComponent} from "./application/application.component";

const routes: Routes = [
  {path: 'applications', component: ApplicationComponent},
  {path: 'applications/create', component: ApplicationCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
