import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../shared/services/profile.service";
import {SignupResponseType} from "../../../../types/signup-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  })
  passwordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required]
  });

  originalProfileData: SignupResponseType;

  constructor(private profileService: ProfileService,
              private _snackBar: MatSnackBar,
              private authService: AuthService,
              private fb: FormBuilder) {

    this.originalProfileData = {
      id: '',
      name: '',
      username: '',
      email: '',
      phone: '',
      enabled: true,
    }
  }

  ngOnInit(): void {
    this.profileService.getProfile()
      .subscribe((data: SignupResponseType) => {
        this.originalProfileData = {...data};
        this.profileForm.patchValue(data);
      });
  }

  updateProfile() {
    if (this.profileForm.valid && this.profileForm.value.name  && this.profileForm.value.username && this.profileForm.value.phone && this.profileForm.value.email) {
      const updatedProfile: { name?: string; phone?: string; email?: string; username?: string } = {};

      if (this.profileForm.value.name !== this.originalProfileData.name) {
        updatedProfile.name = this.profileForm.value.name;
      }
      if (this.profileForm.value.username !== this.originalProfileData.username) {
        updatedProfile.username = this.profileForm.value.username;
      }
      if (this.profileForm.value.phone !== this.originalProfileData.phone) {
        updatedProfile.phone = this.profileForm.value.phone;
      }
      if (this.profileForm.value.email !== this.originalProfileData.email) {
        updatedProfile.email = this.profileForm.value.email;
      }

      if (Object.keys(updatedProfile).length > 0) {
        this.profileService.updateProfile(updatedProfile)
          .subscribe({
            next: (data: DefaultResponseType | SignupResponseType) => {
              let error = null;
              if ((data as DefaultResponseType).status === 400) {
                error = (data as DefaultResponseType).message;
              }

              if (error) {
                this._snackBar.open(error);
                throw new Error(error);
              }

              const updatedData = data as SignupResponseType & { token?: string };

              // проверяем, есть ли новый токен:
              if (updatedData.token) {
                this.authService.saveToken(updatedData.token);
              }

              this.originalProfileData = { ...updatedData };
              this.profileForm.patchValue(updatedData);
              this._snackBar.open('Вы успешно обновили профиль!');
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                this._snackBar.open(errorResponse.error.message);
              } else {
                this._snackBar.open('Ошибка обновления');
              }
            }
          });
      } else {
        this._snackBar.open('Нет изменений для отправки');
      }
    }
  }

  updatePassword() {
    if (this.passwordForm.valid && this.passwordForm.value.oldPassword  && this.passwordForm.value.newPassword) {

      this.profileService.updatePassword(this.passwordForm.value.oldPassword, this.passwordForm.value.newPassword)
        .subscribe({
          next: (response) => {
            this._snackBar.open(response);
            this.passwordForm.reset();
          },
          error: (errorResponse: HttpErrorResponse) => {
            let errorMessage = 'Ошибка изменения пароля';

            if (errorResponse.error) {
              try {
                const parsedError = typeof errorResponse.error === 'string'
                  ? JSON.parse(errorResponse.error)
                  : errorResponse.error;

                if (parsedError && parsedError.message) {
                  errorMessage = parsedError.message;
                }
              } catch (e) {
              }
            }

            this._snackBar.open(errorMessage);
          }
        });
    }
  }
}
