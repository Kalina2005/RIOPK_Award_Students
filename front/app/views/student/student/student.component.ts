import {Component, OnInit} from '@angular/core';
import {SignupResponseType} from "../../../../types/signup-response.type";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentService} from "../../../shared/services/student.service";
import {DeanStudentsType} from "../../../../types/dean-students.type";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentInfo: DeanStudentsType;
  isDean: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private authService: AuthService,
              private studentService: StudentService) {
    this.isDean = this.authService.getIsDeanIn();
    this.studentInfo = {
      id: '',
      name: '',
      gpa: 0,
      absencesHours: 0,
      hasRetakes: false,
      bonusAmount: 0,
      stipendType: '',
      hasStipend: false,
      isBrsmMember: false,
      isProfkomMember: false,
      student: {
        id: '',
        name: '',
        username: '',
        email: '',
        phone: '',
        enabled: true,
      },
    }
    // this.student = {
    //   id: '',
    //   name: '',
    //   username: '',
    //   email: '',
    //   phone: '',
    //   enabled: true,
    // }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.studentService.getStudent(params['id']).subscribe((data: DeanStudentsType) => {
        this.studentInfo = data;
      });
    });
  }
}
