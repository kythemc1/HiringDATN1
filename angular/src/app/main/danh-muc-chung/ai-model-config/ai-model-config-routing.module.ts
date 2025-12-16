import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AIModelConfigComponent } from './ai-model-config.component';
import { AiModelConfigResolver } from './service/ai-model-config.resolver';


const routes: Routes = [
  {
    path: 'ai-model-config',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: AIModelConfigComponent, data: { mode: 'list' } },
      { path: 'add', component: AIModelConfigComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: AIModelConfigComponent, data: { mode: 'edit' }, resolve: { entity: AiModelConfigResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: AIModelConfigComponent, data: { mode: 'view' }, resolve: { entity: AiModelConfigResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AIModelConfigRoutingModule { }
