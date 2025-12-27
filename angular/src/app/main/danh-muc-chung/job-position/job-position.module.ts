
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { JobPositionComponent } from './job-position.component';
import { JobPositionRoutingModule } from './job-position-routing.module';
import { CreateUpdateJobPositionModalComponent } from './modals/create-update/create-update-job-position-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [JobPositionComponent, CreateUpdateJobPositionModalComponent],
  imports: [PrimeNGSharedModule, JobPositionRoutingModule, CommonModule, SharedModule],
})
export class JobPositionModule {}
