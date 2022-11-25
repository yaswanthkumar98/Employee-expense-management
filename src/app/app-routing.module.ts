import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { EmployeeExpenseComponent } from './employee/employee-expense/employee-expense.component';
import { AdminCreateEmployeeComponent } from './admin/admin-create-employee/admin-create-employee.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ShowExpenseComponent } from './employee/show-expense/show-expense.component';
const routes: Routes = [
  { path: 'employee', component: EmployeeHomeComponent },
  { path: 'employee/expense', component: EmployeeExpenseComponent },
  { path: 'admin/employee', component: AdminCreateEmployeeComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'employee/expense/:id', component: ShowExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
