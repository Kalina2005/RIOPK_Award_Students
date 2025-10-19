import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RoleTypeType} from "../../../../types/role-type.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isLogged: boolean = false;
  isAccountant: boolean = false;
  isDean: boolean = false;
  userRole: string = "";

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.userRole = this.getUserRoleFromStorage();
    this.isAccountant = this.authService.getIsAccountantIn();
    this.isDean = this.authService.getIsDeanIn();
  }

  ngOnInit(): void {
    this.authService.isAccountant$.subscribe(isAccountant => {
      this.isAccountant = isAccountant;
    });

    this.authService.isDean$.subscribe(isDean => {
      this.isDean = isDean;
    });
  }

  OnUserLogout(): void {
    this.authService.removeToken();
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

  private getUserRoleFromStorage(): string {
    const rolesString = localStorage.getItem('roles');
    if (rolesString) {
      const rolesArray = JSON.parse(rolesString);
      if (Array.isArray(rolesArray) && rolesArray.length > 0) {
        const role = rolesArray[0];
        return this.formatRoleName(role);
      }
    }
    return 'Пользователь';
  }

  private formatRoleName(role: string): string {
    const roleMap: {[key: string]: string} = {
      'ROLE_ACCOUNTANT': 'Бухгалтер',
      'ROLE_DEAN_EMPLOYEE': 'Декан',
      'ROLE_USER': 'Студент',
    };

    return roleMap[role] || role.replace('ROLE_', '');
  }
}
