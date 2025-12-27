
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CreateUpdateCompanyModalComponent } from './modals/create-update/create-update-company-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CompanyComponent, CreateUpdateCompanyModalComponent],
  imports: [PrimeNGSharedModule, CompanyRoutingModule, CommonModule, SharedModule],
})
export class CompanyModule {}
