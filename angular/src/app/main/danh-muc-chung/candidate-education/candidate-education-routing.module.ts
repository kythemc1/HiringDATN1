import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateEducationComponent } from './candidate-education.component';
import { CandidateEducationResolver } from './service/candidate-education.resolver';


const routes: Routes = [
  {
    path: 'candidate-education',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: CandidateEducationComponent, data: { mode: 'list' } },
      { path: 'add', component: CandidateEducationComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: CandidateEducationComponent, data: { mode: 'edit' }, resolve: { entity: CandidateEducationResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: CandidateEducationComponent, data: { mode: 'view' }, resolve: { entity: CandidateEducationResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateEducationRoutingModule { }
