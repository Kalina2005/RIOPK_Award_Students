import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import {HeaderComponent} from "./shared/layout/header/header.component";
import {LayoutComponent} from "./shared/layout/layout.component";
import {SharedModule} from "./shared/shared.module";




@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ConfirmDialogComponent,
    HeaderComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
