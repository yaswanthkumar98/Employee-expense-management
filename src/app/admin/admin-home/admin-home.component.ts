import { Component, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AddEmployeeComponent} from './../add-employee/add-employee.component';
import {ExpenseService} from './../../expense.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(public activeModal: NgbModal, public service: ExpenseService, private http: HttpClient) {
    this.getEmployees();
   }

  ngOnInit(): void {
   
  }

  public addEmployee = () => {
    const modalRef = this.activeModal.open(AddEmployeeComponent);
  }
  public getEmployees = () => {
    this.service.employeeList = [];
    const url = 'http://localhost:8080/api/employee/all';
    this.http.get<any>(url).subscribe(response => {
      for (let eIndex = 0; eIndex < response.length; eIndex++) {
        this.service.employeeList.push(response[eIndex]);    
      }
        
      });
  }

  public editEmployee = (index:any) => {
    const modalRef = this.activeModal.open(AddEmployeeComponent);
    modalRef.componentInstance.index = index;  
  }

  public deleteEmployee = (empId:any, employee:any, index:Number) => {
    const url = 'http://localhost:8080/api/employee/delete/' + empId;
    this.http.delete<any>(url).subscribe(response => {     
     if (response.status === 'success') {
      this.service.employeeList.splice(index,  1);
      alert(employee.firstName + ' ' + employee.lastName + ' Delete successfully'); 
     } else {
      alert('Something went wrong'); 
     }      
      });
  }

}
