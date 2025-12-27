
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { CandidateSkillComponent } from './candidate-skill.component';
import { CandidateSkillRoutingModule } from './candidate-skill-routing.module';
import { CreateUpdateCandidateSkillModalComponent } from './modals/create-update/create-update-candidate-skill-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CandidateSkillComponent, CreateUpdateCandidateSkillModalComponent],
  imports: [PrimeNGSharedModule, CandidateSkillRoutingModule, CommonModule, SharedModule],
})
export class CandidateSkillModule {}
