import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { Subscription } from 'rxjs';
import { IEmployeeBase } from 'src/app/core/models/resources/IEmployee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  private employeesSub: Subscription;
  private deleteSub: Subscription;
  private employees: IEmployeeBase[] = [];
  public tableHeaders = [
    'first name',
    'last name',
    'email',
    'age',
    'phone number'
  ];
  public keysOrdered = ['firstName','lastName','email','age','phone'];
  openDetails = false;
  selectedEmployeeId: number|string;

  constructor(
  private employeesService: EmployeesService,
  private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees():void {
    this.employeesSub = this.employeesService.fetchAll().subscribe(data=>{
      this.employees=data
    })
  }

  private edit(id):void {
   this.router.navigate([`${this.router.url}/${id}`])
  }

  private delete(id):void {
    this.deleteSub = this.employeesService.delete(id).subscribe(data=>{
      this.employees = data
    })
  }

  private add(){
    this.router.navigate([`${this.router.url}/new`])
  }
  
  ngOnDestroy():void {
    this.employeesSub.unsubscribe();
    this.deleteSub && this.deleteSub.unsubscribe()
  }
}
