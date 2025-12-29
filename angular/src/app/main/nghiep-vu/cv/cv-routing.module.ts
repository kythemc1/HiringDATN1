import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvComponent } from './cv.component';
import { CvResolver } from './service/cv.resolver';


const routes: Routes = [
  {
    path: 'cv',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: CvComponent, data: { mode: 'list' } },
      { path: 'add', component: CvComponent, data: { mode: 'create' } },
      { path: 'edit/:id', component: CvComponent, data: { mode: 'edit' }, resolve: { entity: CvResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
      { path: 'view/:id', component: CvComponent, data: { mode: 'view' }, resolve: { entity: CvResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvRoutingModule { }
