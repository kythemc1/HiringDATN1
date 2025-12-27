
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { AgentThinkingLogComponent } from './agent-thinking-log.component';
import { AgentThinkingLogRoutingModule } from './agent-thinking-log-routing.module';
import { CreateUpdateAgentThinkingLogModalComponent } from './modals/create-update/create-update-agent-thinking-log-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [AgentThinkingLogComponent, CreateUpdateAgentThinkingLogModalComponent],
  imports: [PrimeNGSharedModule, AgentThinkingLogRoutingModule, CommonModule, SharedModule],
})
export class AgentThinkingLogModule {}
