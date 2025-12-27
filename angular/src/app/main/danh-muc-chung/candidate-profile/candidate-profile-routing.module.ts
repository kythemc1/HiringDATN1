import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateProfileComponent } from './candidate-profile.component';
import { CandidateProfileResolver } from './service/candidate-profile.resolver';


const routes: Routes = [
  {
    path: 'candidate-profile',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: CandidateProfileComponent, data: { mode: 'list' } },
      { path: 'add', component: CandidateProfileComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: CandidateProfileComponent, data: { mode: 'edit' }, resolve: { entity: CandidateProfileResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: CandidateProfileComponent, data: { mode: 'view' }, resolve: { entity: CandidateProfileResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateProfileRoutingModule { }
