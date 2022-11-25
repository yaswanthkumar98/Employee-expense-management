import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ExpenseService} from './expense.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private inputData:any = {};
  public alert: string = '';
  constructor( public router: Router, private http: HttpClient, private service: ExpenseService) {
    this.service.userId = this.service.getUser();   
   }

  title = 'Employee Expense System';

  public checkUser = () => {
    if (!this.inputData.username || !this.inputData.password) {
      this.alert = 'Enter username and password';
      return;
    }
    if (this.inputData.username === 'admin' && this.inputData.password === 'admin123') {
      this.router.navigate(['/admin']);
    } else {
      const url ='http://localhost:8080/api/employee/login'; 
    this.http.post<any>(url, {employeeId: this.inputData.username, password: this.inputData.password}).subscribe(response => {
   if (response.status === 'success') {
     this.service.setUser(response.id);
     this.service.userData = this.service.getUserData(() =>{
      this.router.navigate(['/employee']);
    });
   
     } else {
      this.alert = 'Invalid Input';
      return;
     }
    }); 
    }
    
  }
  onKey(event:any) 
  {this.inputData[event.target.name] = event.target.value;}
}
