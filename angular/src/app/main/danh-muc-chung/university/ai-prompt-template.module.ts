
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { AiPromptTemplateComponent } from './ai-prompt-template.component';
import { AiPromptTemplateRoutingModule } from './ai-prompt-template-routing.module';
import { CreateUpdateAiPromptTemplateModalComponent } from './modals/create-update/create-update-ai-prompt-template-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [AiPromptTemplateComponent, CreateUpdateAiPromptTemplateModalComponent],
  imports: [PrimeNGSharedModule, AiPromptTemplateRoutingModule, CommonModule, SharedModule],
})
export class AiPromptTemplateModule {}
