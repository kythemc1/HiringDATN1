
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { CandidateEducationComponent } from './candidate-education.component';
import { CandidateEducationRoutingModule } from './candidate-education-routing.module';
import { CreateUpdateCandidateEducationModalComponent } from './modals/create-update/create-update-candidate-education-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CandidateEducationComponent, CreateUpdateCandidateEducationModalComponent],
  imports: [PrimeNGSharedModule, CandidateEducationRoutingModule, CommonModule, SharedModule],
})
export class CandidateEducationModule {}
