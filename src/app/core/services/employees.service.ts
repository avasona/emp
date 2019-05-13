import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IEmployeeBase, IEmployeeCreate } from '../models/resources/IEmployee';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employees: IEmployeeBase[] = [];
  public employees$ = new BehaviorSubject<IEmployeeBase[]>(this.employees);

  private employee: IEmployeeBase;
  public employee$ = new BehaviorSubject<IEmployeeBase>(this.employee);

  constructor(
    private http: HttpClient
  ) {}

  private extractData(res) {
    let body = res.data;
    return body || {};
  }

  public fetchAll(): Observable<IEmployeeBase[]> {
    this.http.get("/assets/mock/employees.json")
    .pipe(
        map(this.extractData)
    )
    .subscribe(res=>{
        this.employees = res
        this.employees$.next(res)
    })
    
    return this.employees$
  }

  public fetchOne(id: number|string): Observable<IEmployeeBase>{
    this.http.get("/assets/mock/employees.json")
    .pipe(
        map(this.extractData)   
    )
    .subscribe(res=>{
        let filteredEmp = res.filter(r => r.id === +id);
        filteredEmp.length
          ? (this.employee = filteredEmp[0])
          : null;
          
        this.employee$.next(this.employee)
    })
    
    return this.employee$
  }

  public delete(id: number|string): Observable<IEmployeeBase[]> {
    this.employees = this.employees.filter((emp)=>{
        return emp.id !== id});
    this.employees$.next(this.employees)
    return this.employees$
  }

  public update(updatedResource: IEmployeeBase): void {
    console.log('update', updatedResource)
  }

  public create(newResource: IEmployeeCreate): void{
     console.log('create', newResource)
   }
}
