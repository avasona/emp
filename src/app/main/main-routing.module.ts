import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeesListComponent } from './components/employee/employees-list/employees-list.component';

export const routes: Routes = [
    {
        path: 'employees',
        component: EmployeesListComponent,
        pathMatch: 'full',
    },
    {
        path: 'employees',
        children:[
            
            {
                path: '',
                component: EmployeesListComponent,
                pathMatch: 'full'
            },
            {
                path: ':id',
                component: EmployeeDetailsComponent,
            },
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    }
];

export const DECLARATIONS = [
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
