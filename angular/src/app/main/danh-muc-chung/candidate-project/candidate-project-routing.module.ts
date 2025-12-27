import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateProjectComponent } from './candidate-project.component';
import { CandidateProjectResolver } from './service/candidate-project.resolver';


const routes: Routes = [
  {
    path: 'candidate-project',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: CandidateProjectComponent, data: { mode: 'list' } },
      { path: 'add', component: CandidateProjectComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: CandidateProjectComponent, data: { mode: 'edit' }, resolve: { entity: CandidateProjectResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: CandidateProjectComponent, data: { mode: 'view' }, resolve: { entity: CandidateProjectResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateProjectRoutingModule { }
