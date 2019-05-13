import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeesListComponent } from './components/employee/employees-list/employees-list.component';

@NgModule({
  declarations: [
    EmployeeDetailsComponent,
    EmployeesListComponent
  ],
  imports: [
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
