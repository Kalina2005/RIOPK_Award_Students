import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DeanStudentsType} from "../../../types/dean-students.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {ApplicationType, ApplicationTypeResponse} from "../../../types/application.type";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<DeanStudentsType[]> {
    return this.http.get<DeanStudentsType[]>(environment.api + 'students');
  }

  getStudent(url: string): Observable<DeanStudentsType> {
    return this.http.get<DeanStudentsType>(environment.api + 'students/' + url);
  }

  searchStudent(name: string): Observable<DeanStudentsType[]> {
    return this.http.get<DeanStudentsType[]>(environment.api + 'students/search?name=' + name);
  }

  createApplication(params: ApplicationType): Observable<ApplicationTypeResponse> {
    return this.http.post<ApplicationTypeResponse>(environment.api + 'applications', params);
  }
}
