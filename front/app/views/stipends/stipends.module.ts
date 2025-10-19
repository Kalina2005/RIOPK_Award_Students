import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StipendsRoutingModule } from './stipends-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StipendsComponent} from "./stipends/stipends.component";


@NgModule({
  declarations: [
    StipendsComponent
  ],
  imports: [
    CommonModule,
    StipendsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StipendsModule { }
