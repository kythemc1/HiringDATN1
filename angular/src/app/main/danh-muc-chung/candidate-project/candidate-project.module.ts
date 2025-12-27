
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { CandidateProjectComponent } from './candidate-project.component';
import { CandidateProjectRoutingModule } from './candidate-project-routing.module';
import { CreateUpdateCandidateProjectModalComponent } from './modals/create-update/create-update-candidate-project-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CandidateProjectComponent, CreateUpdateCandidateProjectModalComponent],
  imports: [PrimeNGSharedModule, CandidateProjectRoutingModule, CommonModule, SharedModule],
})
export class CandidateProjectModule {}
