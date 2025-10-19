import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {SignupResponseType} from "../../../../types/signup-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoleTypeType} from "../../../../types/role-type.type";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required]],
  });
  message: string | null = null;
  isError: boolean = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {

  }

  signup(): void {
    if (this.signupForm.valid && this.signupForm.value.password && this.signupForm.value.email
      && this.signupForm.value.name && this.signupForm.value.username && this.signupForm.value.phone) {
      this.authService.signup(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name, this.signupForm.value.phone)
        .subscribe({
          next: (data: DefaultResponseType | SignupResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).status === 400) {
              error = (data as DefaultResponseType).message;
            }

            const signupResponse = data as SignupResponseType;
            if (!signupResponse.id || !signupResponse.username) {
              error = 'Ошибка регистрации';
            }

            if (error) {
              this.isError = true;
              this.message = error;
              return;
            }

            this._snackBar.open('Вы успешно зарегистрировались');
            this.router.navigate(['/login']);
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.isError = true;
            if (errorResponse.error && errorResponse.error.message) {
              this.message = errorResponse.error.message;
            } else {
              this.message = 'Ошибка регистрации';
            }
          }
        })
    }
  }
}
