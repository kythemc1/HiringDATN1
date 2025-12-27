import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobPositionComponent } from './job-position.component';
import { JobPositionResolver } from './service/job-position.resolver';


const routes: Routes = [
  {
    path: 'job-position',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: JobPositionComponent, data: { mode: 'list' } },
      { path: 'add', component: JobPositionComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: JobPositionComponent, data: { mode: 'edit' }, resolve: { entity: JobPositionResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: JobPositionComponent, data: { mode: 'view' }, resolve: { entity: JobPositionResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPositionRoutingModule { }
