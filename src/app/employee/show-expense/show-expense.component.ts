import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, ParamMap  } from '@angular/router';
import {ExpenseService} from './../../expense.service';
@Component({
  selector: 'app-show-expense',
  templateUrl: './show-expense.component.html',
  styleUrls: ['./show-expense.component.css']
})
export class ShowExpenseComponent implements OnInit {
 public id:any = {};
 public expenseDetails:any = [];
  constructor(public router: ActivatedRoute, public service: ExpenseService) { 
    this.service.getUserData(() => {
      this.ngOnInit();
    });
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id =  params.get('id');
    });
    this.service.getExpenseData(this.id, (response:any) => {
      this.expenseDetails.push(response);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {   

  }

}
