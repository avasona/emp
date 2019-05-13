import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'base',
    loadChildren: '../base/base.module#BaseModule',
  },
  {
    path: '**',
    redirectTo: '/base/main/employees'
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
