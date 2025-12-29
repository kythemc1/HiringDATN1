
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { CvComponent } from './cv.component';
import { CvRoutingModule } from './cv-routing.module';
import { CreateUpdateCvModalComponent } from './modals/create-update/create-update-cv-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CvComponent, CreateUpdateCvModalComponent],
  imports: [PrimeNGSharedModule, CvRoutingModule, CommonModule, SharedModule],
})
export class CvModule {}
