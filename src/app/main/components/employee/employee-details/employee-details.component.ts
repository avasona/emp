import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { Subscription } from 'rxjs';
import { IEmployeeBase, IEmployeeCreate } from 'src/app/core/models/resources/IEmployee';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'src/app/core/classes/validators';
import { validateAllFormFields } from 'src/app/shared/helpers/validateAllFormFields';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit,OnDestroy {
  @Input() id: number | string;
  employeeSub: Subscription;
  employee: IEmployeeBase;
  employeeLoaded: boolean = false;
  formSubmitted: boolean =false;
  protected resourceDefault = {} as IEmployeeCreate
  form: FormGroup;
  creationMode: boolean;

  constructor(
    public route: ActivatedRoute,
    private employeeService: EmployeesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

   const {id} = this.route.snapshot.params;

    id === 'new'
      ? this.enterCreationMode()
      : this.getEmployee(id);
  }

  private enterCreationMode(): void{
    this.creationMode = true;
    this.employeeLoaded = true;
    this.initForm()
  }

  private getEmployee(id): void{
    this.employeeSub = this.employeeService.fetchOne(id).subscribe(data=>{
      this.employee = data;
      if(this.employee){
        this.employeeLoaded= true;
        this.initForm(this.employee)
      }
    })
  }

  initForm(emp = this.resourceDefault){
    const armPhonePattern = /^\+374?([0-9]{8})$/;
    this.form = this.fb.group({
      firstName: [emp.firstName, [Validators.required]],
      lastName: [emp.lastName],
      age: [emp.age, [Validators.min(18), Validators.max(100)]],
      email: [emp.email, [Validators.email]],
      phone: [emp.phone, [Validators.pattern(armPhonePattern)]],
    });
  }

  get controls() { return this.form.controls; }

  submit(): void{
    validateAllFormFields(this.form);
    this.formSubmitted = true;
  
    if (!this.form.valid) { return; }

    const {value} = this.form;



    const employeeEdited = this.creationMode
      ? { ...value}
      : { ...this.employee, ...value };
    this.creationMode
      ? this.createEmployee(employeeEdited)
      : this.editEmployee(employeeEdited)
    }

    createEmployee(resource) {
      this.employeeService.create(resource)
    }

    editEmployee(resource) {
      this.employeeService.update(resource)
    }
  ngOnDestroy(): void{
    this.employeeSub && this.employeeSub.unsubscribe()
  }
}
