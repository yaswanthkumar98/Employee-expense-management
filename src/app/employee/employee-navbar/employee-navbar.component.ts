import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from "./../../expense.service";
@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.css']
})
export class EmployeeNavbarComponent implements OnInit {

  constructor(public router: Router, public service: ExpenseService) { }

  ngOnInit(): void {
  }
  
  public logout = ()  => {
  this.service.logout();
  }

}
