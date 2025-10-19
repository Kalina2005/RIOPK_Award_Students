import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputMaskModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    FormsModule
  ]
})
export class AccountModule { }
