
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { AIModelConfigComponent } from './ai-model-config.component';
import { AIModelConfigRoutingModule } from './ai-model-config-routing.module';
import { CreateUpdateAIModelConfigModalComponent } from './modals/create-update/create-update-ai-model-config-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [AIModelConfigComponent, CreateUpdateAIModelConfigModalComponent],
  imports: [PrimeNGSharedModule, AIModelConfigRoutingModule, CommonModule, SharedModule],
})
export class AIModelConfigModule {}
