import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {SignupResponseType} from "../../../types/signup-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {RoleTypeType} from "../../../types/role-type.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey: string = 'Token';
  public userRoleKey: string = 'roles';
  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  public isAccountant$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private isAccountant: boolean = false;

  public isDean$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private isDean: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);

    const storedRole = localStorage.getItem(this.userRoleKey);
    this.isAccountant = storedRole ? JSON.parse(storedRole).includes(RoleTypeType.ROLE_ACCOUNTANT) : false;
    this.isDean = storedRole ? JSON.parse(storedRole).includes(RoleTypeType.ROLE_DEAN_EMPLOYEE) : false;

    this.isLogged$.next(this.isLogged);
    this.isAccountant$.next(this.isAccountant);
    this.isDean$.next(this.isDean);
  }

  login(username: string, password: string): Observable<LoginResponseType | DefaultResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>(environment.api + 'auth', {
      username, password
    })
  }

  signup(username: string, email: string, password: string, name: string, phone: string): Observable<SignupResponseType | DefaultResponseType> {
    return this.http.post<SignupResponseType | DefaultResponseType>(environment.api + 'registration', {
      username, email, password, name, phone
    })
  }

  public getIsLoggedIn() {
    return this.isLogged
  }

  public getIsAccountantIn() {
    return this.isAccountant
  }

  public getIsDeanIn() {
    return this.isDean
  }

  public setToken(accessToken: string, userRole: string[]): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.userRoleKey, JSON.stringify(userRole));

    this.isLogged = true;
    this.isAccountant = userRole.includes(RoleTypeType.ROLE_ACCOUNTANT);
    this.isDean = userRole.includes(RoleTypeType.ROLE_DEAN_EMPLOYEE);

    this.isLogged$.next(true);
    this.isAccountant$.next(this.isAccountant);
    this.isDean$.next(this.isDean);
  }

  public saveToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  public removeToken(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.userRoleKey);
    this.isLogged = false;
    this.isLogged$.next(false);

    this.isAccountant = false;
    this.isAccountant$.next(false);

    this.isDean = false;
    this.isDean$.next(false);
  }

  public getUserRole(): { roles: RoleTypeType | null } {
    return {
      roles: localStorage.getItem(this.userRoleKey) as RoleTypeType | null
    }
  }

  public getToken(): { accessToken: string | null } {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
    }
  }

}
