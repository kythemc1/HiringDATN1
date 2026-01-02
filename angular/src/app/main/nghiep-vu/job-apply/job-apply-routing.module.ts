import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobApplyComponent } from './job-apply.component';
import { JobPostingResolver } from './service/job-posting.resolver';


const routes: Routes = [
  {
    path: 'job-apply',
    canActivate: [authGuard, permissionGuard],
    children: [
      { path: '', component: JobApplyComponent, data: { mode: 'list' } },
        ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPostingRoutingModule { }
