import { Component, OnInit } from '@angular/core';
import {ExpenseService} from './../../expense.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-admin-create-employee',
  templateUrl: './admin-create-employee.component.html',
  styleUrls: ['./admin-create-employee.component.css']
})
export class AdminCreateEmployeeComponent implements OnInit {

  constructor(public service: ExpenseService, private http: HttpClient) {
    this.getExpense();
  }

  ngOnInit(): void {
  }

  public getExpense = () => {
    this.service.expenseList = [];
    const url = 'http://localhost:8080/api/expense/employee/all';
    this.http.get<any>(url).subscribe(response => {
      for (let eIndex = 0; eIndex < response.length; eIndex++) {
        this.service.expenseList.push(response[eIndex]);    
      }
        
      });
  }

  download(expId:any, filename:any) {
    const link = document.createElement("a");
    link.href = 'http://localhost:8080/api/expense/download/' + expId;
    link.download = filename;
    link.click();
  }
  public changeStatus = (index:any, eId:any, status:any, inputData:any) => {
    inputData.status = status === 'Accept' ? 'Accepted' : 'Already claimed'
    const url ='http://localhost:8080/api/expense/update/' + eId; 
    this.http.put<any>(url, inputData).subscribe(response => { 
      if (response.status === 'success') {
        this.service.expenseList[index].approvedDate  = response.date;
      }     
    this.ngOnInit();
    });
  }

}
