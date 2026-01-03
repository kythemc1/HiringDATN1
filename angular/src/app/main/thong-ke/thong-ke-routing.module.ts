import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThongKeComponent } from './thong-ke.component';


const routes: Routes = [
  {
    path: 'thong-ke',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: ThongKeComponent, data: { mode: 'list' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongKeRoutingModule { }
