import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {ExpenseService} from './../../expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
public alert:string ='';
public inputData:any = {};
public isEdit = false;
public fileName:string = '';

  constructor(public activeModal: NgbActiveModal, private http: HttpClient, public service: ExpenseService) { }

  ngOnInit(): void {
  }

  onKey(event:any) 
  {this.inputData[event.target.name] = event.target.value;}

  public addExpense = () => {
    if (!this.inputData.department || !this.inputData.expenseTitle || !this.inputData.expenseType || !this.inputData.project || !this.inputData.expenseDate 
      || !this.inputData.department ) {
        this.alert = 'Please enter data correctly';
        return;
    } 
    if (!this.fileName) {
      this.alert = 'Please upload file';
      return;
    }
    this.inputData.userId = this.service.getUser();
    this.inputData.status = 'Pending';
    this.inputData.document = this.fileName; 
    const url ='http://localhost:8080/api/expense/new'; 
    this.http.post<any>(url, this.inputData).subscribe(response => {
   this.service.expenseUserList.push(response);
    this. activeModal.dismiss('Cross click');
    });
    }

    public updateExpense = () => {
      if (!this.inputData.department || !this.inputData.expenseTitle || !this.inputData.expenseType || !this.inputData.project || !this.inputData.expenseDate 
        || !this.inputData.department ) {
          this.alert = 'Please enter data correctly';
          return;
      } 
      
      this.inputData.userId = this.service.getUser(); 
      this.inputData.document = this.fileName; 
      const url ='http://localhost:8080/api/expense/update/' + this.inputData.id; 
      this.http.put<any>(url, this.inputData).subscribe(response => {     
      this. activeModal.dismiss('Cross click');
      });
      }

      public readFile = (fileEvent: any) => { 
        const file = fileEvent.target.files[0];
        this.fileName = file.name;       
      }

}
