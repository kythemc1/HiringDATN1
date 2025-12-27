
import { NgModule } from '@angular/core';

import { PrimeNGSharedModule } from '../../../shared/primeng-shared.module';
import { SkillDefinitionComponent } from './skill-definition.component';
import { SkillDefinitionRoutingModule } from './skill-definition-routing.module';
import { CreateUpdateSkillDefinitionModalComponent } from './modals/create-update/create-update-skill-definition-modal.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [SkillDefinitionComponent, CreateUpdateSkillDefinitionModalComponent],
  imports: [PrimeNGSharedModule, SkillDefinitionRoutingModule, CommonModule, SharedModule],
})
export class SkillDefinitionModule {}
