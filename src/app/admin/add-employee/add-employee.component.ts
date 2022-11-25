import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {ExpenseService} from './../../expense.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  public inputData:any = {};
  public alert: string = '';
  public index = '';
  public isEdit = false;
  constructor(public activeModal: NgbActiveModal, private http: HttpClient, public service: ExpenseService) { }

  ngOnInit(): void {
   if (this.index !== "") {
    this.isEdit = true;
    this.inputData = this.service.employeeList[this.index];
   }
  }
  onKey(event:any) 
  {this.inputData[event.target.name] = event.target.value;}
  public addUser = () => {
    if (!this.inputData.firstName || !this.inputData.lastName || !this.inputData.password || !this.inputData.joiningDate || !this.inputData.email 
      || !this.inputData.department || !this.inputData.employeeId ) {
        this.alert = 'Please enter data correctly';
        return;
    }  
     
    const url ='http://localhost:8080/api/employee/new'; 
    this.http.post<any>(url, this.inputData).subscribe(response => {
    this.service.employeeList.push(response);
    this. activeModal.dismiss('Cross click');
    });

    }

    public updateUser = () => {
      if (!this.inputData.firstName || !this.inputData.lastName || !this.inputData.password || !this.inputData.joiningDate || !this.inputData.email 
        || !this.inputData.department || !this.inputData.employeeId ) {
          this.alert = 'Please enter data correctly';
          return;
      }  
       
      const url ='http://localhost:8080/api/employee/update/' + this.inputData.id; 
      this.http.put<any>(url, this.inputData).subscribe(response => {
        if (response.status === 'success') {
          this.service.employeeList[this.index] = this.inputData;
         this. activeModal.dismiss('Cross click');
        } else {
          alert('something went wrong');
        }
      
      });
  
      }
    
  }

