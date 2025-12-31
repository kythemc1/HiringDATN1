
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { JobPostingComponent } from './job-posting.component';
import { JobPostingRoutingModule } from './job-posting-routing.module';
import { CreateUpdateJobPostingModalComponent } from './modals/create-update/create-update-job-posting-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [JobPostingComponent, CreateUpdateJobPostingModalComponent],
  imports: [PrimeNGSharedModule, JobPostingRoutingModule, CommonModule, SharedModule],
})
export class JobPostingModule {}
