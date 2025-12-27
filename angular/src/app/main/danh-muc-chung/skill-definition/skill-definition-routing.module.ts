import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillDefinitionComponent } from './skill-definition.component';
import { SkillDefinitionResolver } from './service/skill-definition.resolver';


const routes: Routes = [
  {
    path: 'skill-definition',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: SkillDefinitionComponent, data: { mode: 'list' } },
      { path: 'add', component: SkillDefinitionComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: SkillDefinitionComponent, data: { mode: 'edit' }, resolve: { entity: SkillDefinitionResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: SkillDefinitionComponent, data: { mode: 'view' }, resolve: { entity: SkillDefinitionResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillDefinitionRoutingModule { }
