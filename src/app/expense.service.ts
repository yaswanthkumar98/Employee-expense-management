import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
public employeeList:any = [];
public userId:any = {};
public userData:any = {};
public expenseUserList:any = [];
public expenseList:any = [];
public userRow = ['firstName', 'lastName', 'email', 'department', 'employeeId', 'joiningDate'];
  constructor(public router: Router, private cookieService: CookieService, private http: HttpClient) { }

  public logout = () => {
    this.router.navigate(['/']);
  }

  public setUser(userId:any) {
    this.cookieService.set( 'name', userId);
  }

  public getUser() {
    return  this.cookieService.get('name');
  }

  public getUserData = (callback?:any) => {
    const userId = this.getUser();
    if (userId === "") {
      this.logout();
    }
    const url ='http://localhost:8080/api/employee/data/' + userId; 
    this.http.get<any>(url).subscribe(response => {
      this.userData = response;
      if (callback !== undefined) {
        callback();
      }
     
    });
  }

  public getExpenseById = (callback?:any) => {
    const userId = this.getUser();
    if (userId === "") {
      this.logout();
    }
    const url ='http://localhost:8080/api/expense/employee/' + userId; 
    this.http.get<any>(url).subscribe(response => {
      this.expenseUserList = response;
      if (callback !== undefined) {
        callback();
      }
     
    });
  }

  public getExpenseData = (id:any, callback?:any) => {  
    if (id === "") {
      this.logout();
    }
    const url ='http://localhost:8080/api/expense/view/' + id; 
    this.http.get<any>(url).subscribe(response => {
      
      if (callback !== undefined) {
        callback(response);
      }
     
    });
  }

  public viewExpense = (id:any) => {
    this.router.navigate(['/employee/expense/'+id]);
  }
 
}
