
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { CandidateCertificateComponent } from './candidate-certificate.component';
import { CandidateCertificateRoutingModule } from './candidate-certificate-routing.module';
import { CreateUpdateCandidateCertificateModalComponent } from './modals/create-update/create-update-candidate-certificate-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CandidateCertificateComponent, CreateUpdateCandidateCertificateModalComponent],
  imports: [PrimeNGSharedModule, CandidateCertificateRoutingModule, CommonModule, SharedModule],
})
export class CandidateCertificateModule {}
