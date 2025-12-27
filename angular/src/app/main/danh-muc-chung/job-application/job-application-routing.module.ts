import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobApplicationComponent } from './job-application.component';
import { JobApplicationResolver } from './service/job-application.resolver';


const routes: Routes = [
  {
    path: 'job-application',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: JobApplicationComponent, data: { mode: 'list' } },
      { path: 'add', component: JobApplicationComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: JobApplicationComponent, data: { mode: 'edit' }, resolve: { entity: JobApplicationResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: JobApplicationComponent, data: { mode: 'view' }, resolve: { entity: JobApplicationResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobApplicationRoutingModule { }
