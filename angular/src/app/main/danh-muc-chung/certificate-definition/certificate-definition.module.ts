
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { CertificateDefinitionComponent } from './certificate-definition.component';
import { CertificateDefinitionRoutingModule } from './certificate-definition-routing.module';
import { CreateUpdateCertificateDefinitionModalComponent } from './modals/create-update/create-update-certificate-definition-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CertificateDefinitionComponent, CreateUpdateCertificateDefinitionModalComponent],
  imports: [PrimeNGSharedModule, CertificateDefinitionRoutingModule, CommonModule, SharedModule],
})
export class CertificateDefinitionModule {}
