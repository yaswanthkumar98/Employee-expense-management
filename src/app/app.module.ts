import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FileUploadModule } from "ng2-file-upload";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { EmployeeNavbarComponent } from './employee/employee-navbar/employee-navbar.component';
import { EmployeeExpenseComponent } from './employee/employee-expense/employee-expense.component';
import { AdminCreateEmployeeComponent } from './admin/admin-create-employee/admin-create-employee.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { AddExpenseComponent } from './employee/add-expense/add-expense.component';
import { ShowExpenseComponent } from './employee/show-expense/show-expense.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeHomeComponent,
    EmployeeNavbarComponent,
    EmployeeExpenseComponent,
    AdminCreateEmployeeComponent,
    AdminHomeComponent,
    AdminNavbarComponent,
    AddEmployeeComponent,
    AddExpenseComponent,
    ShowExpenseComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
