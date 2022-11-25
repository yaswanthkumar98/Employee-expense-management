import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from "./../../expense.service";
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(public router: Router, public service: ExpenseService) { }

  ngOnInit(): void {
  }

  public logout = ()  => {
    this.service.logout();
    }

}
