import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ApplicationCreateComponent } from './application-create/application-create.component';
import {ApplicationComponent} from "./application/application.component";


@NgModule({
  declarations: [
    ApplicationComponent,
    ApplicationCreateComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApplicationsModule { }
