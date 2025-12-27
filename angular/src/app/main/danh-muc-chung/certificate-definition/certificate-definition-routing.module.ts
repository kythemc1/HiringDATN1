import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificateDefinitionComponent } from './certificate-definition.component';
import { CertificateDefinitionResolver } from './service/certificate-definition.resolver';


const routes: Routes = [
  {
    path: 'certificate-definition',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: CertificateDefinitionComponent, data: { mode: 'list' } },
      { path: 'add', component: CertificateDefinitionComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: CertificateDefinitionComponent, data: { mode: 'edit' }, resolve: { entity: CertificateDefinitionResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: CertificateDefinitionComponent, data: { mode: 'view' }, resolve: { entity: CertificateDefinitionResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificateDefinitionRoutingModule { }
