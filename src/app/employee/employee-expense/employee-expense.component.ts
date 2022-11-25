import { Component, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AddExpenseComponent} from './../../employee/add-expense/add-expense.component';
import {ExpenseService} from './../../expense.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-employee-expense',
  templateUrl: './employee-expense.component.html',
  styleUrls: ['./employee-expense.component.css']
})
export class EmployeeExpenseComponent implements OnInit {

  constructor(public activeModal: NgbModal, public service: ExpenseService, private http: HttpClient) { 
    this.service.getExpenseById(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
  }
  
  public addExpense = () => {
    const modalRef = this.activeModal.open(AddExpenseComponent);     
  }

  public deleteExpense = (eId:any, expense:any, index:Number) => {
    const url = 'http://localhost:8080/api/expense/delete/' + eId;
    this.http.delete<any>(url).subscribe(response => {     
     if (response.status === 'success') {
      this.service.expenseUserList.splice(index, 1);
      alert(expense.expenseTitle + ' Delete successfully'); 
     } else {
      alert('Something went wrong'); 
     }      
      });
  }

  public updateExpense = (userData:any) => {
    const modalRef = this.activeModal.open(AddExpenseComponent);  
    modalRef.componentInstance.inputData = userData;  
    modalRef.componentInstance.isEdit = true;     
  }

  
  download(expId:any, filename:any) {
    const link = document.createElement("a");
    link.href = 'http://localhost:8080/api/expense/download/' + expId;
    link.download = filename;
    link.click();
  }

  public viewExpense = (id:any) => {
    this.service.viewExpense(id);
  }
}
