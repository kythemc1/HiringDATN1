import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyResolver } from './service/company.resolver';


const routes: Routes = [
  {
    path: 'company',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: CompanyComponent, data: { mode: 'list' } },
      { path: 'add', component: CompanyComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: CompanyComponent, data: { mode: 'edit' }, resolve: { entity: CompanyResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: CompanyComponent, data: { mode: 'view' }, resolve: { entity: CompanyResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }
