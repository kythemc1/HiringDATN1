import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateSkillResolver } from './service/candidate-skill.resolver';
import { CandidateSkillComponent } from './candidate-skill.component';


const routes: Routes = [
  {
    path: 'candidate-skill',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: CandidateSkillComponent, data: { mode: 'list' } },
      { path: 'add', component: CandidateSkillComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: CandidateSkillComponent, data: { mode: 'edit' }, resolve: { entity: CandidateSkillResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: CandidateSkillComponent, data: { mode: 'view' }, resolve: { entity: CandidateSkillResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateSkillRoutingModule { }
