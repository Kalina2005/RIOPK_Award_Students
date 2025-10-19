import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DeanStudentsType} from "../../../types/dean-students.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

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

  filterStudents(filters: any): Observable<DeanStudentsType[]> {
    let params = new HttpParams()
      .set('hasNoRetakes', filters.hasNoRetakes ? 'true' : 'false')
      .set('lessThan11AbsenceHours', filters.lessThan11AbsenceHours ? 'true' : 'false')
      .set('gpaNotLowerThan5', filters.gpaNotLowerThan5 ? 'true' : 'false');

    return this.http.get<DeanStudentsType[]>(environment.api + 'students/filter', { params });
  }

  updateStudent(studentId: string, student: DeanStudentsType): Observable<DeanStudentsType | DefaultResponseType> {
    return this.http.put<DeanStudentsType | DefaultResponseType>(environment.api + 'students/' + studentId,
        student
    );
  }
}
