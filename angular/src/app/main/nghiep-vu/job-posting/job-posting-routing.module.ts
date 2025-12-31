import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobPostingComponent } from './job-posting.component';
import { JobPostingResolver } from './service/job-posting.resolver';


const routes: Routes = [
  {
    path: 'job-posting',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: JobPostingComponent, data: { mode: 'list' } },
      { path: 'add', component: JobPostingComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: JobPostingComponent, data: { mode: 'edit' }, resolve: { entity: JobPostingResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: JobPostingComponent, data: { mode: 'view' }, resolve: { entity: JobPostingResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPostingRoutingModule { }
