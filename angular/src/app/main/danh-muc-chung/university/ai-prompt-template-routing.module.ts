import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AiPromptTemplateComponent } from './ai-prompt-template.component';
import { AiPromptTemplateResolver } from './service/ai-prompt-template.resolver';


const routes: Routes = [
  {
    path: 'ai-prompt-template',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: AiPromptTemplateComponent, data: { mode: 'list' } },
      { path: 'add', component: AiPromptTemplateComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: AiPromptTemplateComponent, data: { mode: 'edit' }, resolve: { entity: AiPromptTemplateResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: AiPromptTemplateComponent, data: { mode: 'view' }, resolve: { entity: AiPromptTemplateResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiPromptTemplateRoutingModule { }
