import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExpenseService} from './../../expense.service';
import { Router } from '@angular/router';
import {AddEmployeeComponent} from './../../admin/add-employee/add-employee.component';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {
  public userData:any = {};
  constructor(private http: HttpClient, public service: ExpenseService, public router: Router, public activeModal: NgbModal) {
    this.service.getUserData(() => {
      this.ngOnInit();
    });
   }

  ngOnInit(): void {
  
  this.userData = this.service.userData;
  }

  public editEmployee = () => {
    const modalRef = this.activeModal.open(AddEmployeeComponent);
    modalRef.componentInstance.inputData = this.userData;  
    modalRef.componentInstance.isEdit = true;  
  }

}
