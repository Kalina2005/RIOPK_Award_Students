import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {SignupResponseType} from "../../../types/signup-response.type";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<SignupResponseType> {
    return this.http.get<SignupResponseType>(environment.api + 'profile/me');
  }

  updateProfile(value: { name?: string, username?: string, phone?: string, email?: string }): Observable<SignupResponseType | DefaultResponseType> {
    return this.http.put<SignupResponseType | DefaultResponseType>(environment.api + 'profile/edit', value);
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<string> {
    return this.http.post(
      environment.api + 'profile/change-password',
      { oldPassword, newPassword },
      {
        responseType: 'text' as const
      }
    );
  }

}
