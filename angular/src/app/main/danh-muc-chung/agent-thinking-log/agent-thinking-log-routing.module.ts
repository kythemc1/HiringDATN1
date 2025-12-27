import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentThinkingLogComponent } from './agent-thinking-log.component';
import { AgentThinkingLogResolver } from './service/agent-thinking-log.resolver';


const routes: Routes = [
  {
    path: 'agent-thinking-log',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: AgentThinkingLogComponent, data: { mode: 'list' } },
      { path: 'add', component: AgentThinkingLogComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: AgentThinkingLogComponent, data: { mode: 'edit' }, resolve: { entity: AgentThinkingLogResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: AgentThinkingLogComponent, data: { mode: 'view' }, resolve: { entity: AgentThinkingLogResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentThinkingLogRoutingModule { }
