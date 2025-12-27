
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { JobApplicationComponent } from './job-application.component';
import { JobApplicationRoutingModule } from './job-application-routing.module';
import { CreateUpdateJobApplicationModalComponent } from './modals/create-update/create-update-job-application-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [JobApplicationComponent, CreateUpdateJobApplicationModalComponent],
  imports: [PrimeNGSharedModule, JobApplicationRoutingModule, CommonModule, SharedModule],
})
export class JobApplicationModule {}
