
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { JobApplyComponent } from './job-apply.component';
import { JobPostingRoutingModule } from './job-apply-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [JobApplyComponent],
  imports: [PrimeNGSharedModule, JobPostingRoutingModule, CommonModule, SharedModule],
})
export class JobApplyModule {}
