import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignupResponseType} from "../../../types/signup-response.type";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {GroupResponseType} from "../../../types/group-response.type";
import {StudentResponseType} from "../../../types/student-response.type";
import {StipendsType} from "../../../types/stipends.type";
import {StipendsSettingsType} from "../../../types/stipends-settings.type";

@Injectable({
  providedIn: 'root'
})
export class StipendsService {

  constructor(private http: HttpClient) { }

  getStipends(): Observable<StipendsType[]> {
    return this.http.get<StipendsType[]>(environment.api + 'stipends');
  }

  updateStipend(id: string, number: number): Observable<StipendsType> {
    return this.http.put<StipendsType>(
      `${environment.api}stipends/${id}/amount`,
      {number}
    );
  }

  getStipendsSettings(): Observable<StipendsSettingsType[]> {
    return this.http.get<StipendsSettingsType[]>(environment.api + 'stipend-settings');
  }

  updateStipendsSettings(id: string, settings: {profkomDeductionPercent: number, brsmDeductionPercent: number}): Observable<StipendsType> {
    return this.http.put<StipendsType>(
      environment.api + 'stipend-settings',
      {settings}
    );
  }
}
