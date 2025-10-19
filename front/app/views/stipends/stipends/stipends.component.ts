import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './stipends.component.html',
  styleUrls: ['./stipends.component.scss']
})
export class StipendsComponent implements OnInit {
  profkomPercentage: number = 1.0;
  brsmPercentage: number = 0.5;

  scholarshipValues = {
    social: 120.50,
    named: 150.00,
    universityCouncil: 130.00,
    presidential: 200.00,
    academic5_599: 80.00,
    academic6_799: 100.00,
    academic8_899: 120.00,
    academic9_10: 140.00
  };

  constructor() { }

  ngOnInit(): void {
  }
}
