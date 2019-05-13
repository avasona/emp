import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BaseModuleComponent } from './components/base-module.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BaseModuleComponent,
    children: [
        {
          path: 'main',
          loadChildren: '../main/main.module#MainModule', // lazy
        }
      ]
  },
  {
    path: '***',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes
    )
  ]
})
export class BaseRoutingModule {
}
