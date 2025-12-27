
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { CandidateProfileComponent } from './candidate-profile.component';
import { CandidateProfileRoutingModule } from './candidate-profile-routing.module';
import { CreateUpdateCandidateProfileModalComponent } from './modals/create-update/create-update-candidate-profile-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CandidateProfileComponent, CreateUpdateCandidateProfileModalComponent],
  imports: [PrimeNGSharedModule, CandidateProfileRoutingModule, CommonModule, SharedModule],
})
export class CandidateProfileModule {}
