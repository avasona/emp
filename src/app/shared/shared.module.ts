import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableComponent } from './components/table/table.component';

const sharedModules = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ];

  const declarations = [
    PageNotFoundComponent,
    TableComponent
  ];

  const entryComponents = [];
  
@NgModule({
  imports: [
    ...sharedModules,
  ],
  declarations,
  entryComponents,
  exports: [sharedModules, declarations ],
})
export class SharedModule { }
