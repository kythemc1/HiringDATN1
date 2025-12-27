import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateCertificateComponent } from './candidate-certificate.component';
import { CandidateCertificateResolver } from './service/candidate-certificate.resolver';


const routes: Routes = [
  {
    path: 'candidate-certificate',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: CandidateCertificateComponent, data: { mode: 'list' } },
      { path: 'add', component: CandidateCertificateComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: CandidateCertificateComponent, data: { mode: 'edit' }, resolve: { entity: CandidateCertificateResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: CandidateCertificateComponent, data: { mode: 'view' }, resolve: { entity: CandidateCertificateResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateCertificateRoutingModule { }
