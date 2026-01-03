
import { NgModule } from '@angular/core';

import { ThongKeComponent } from './thong-ke.component';
import { ThongKeRoutingModule } from './thong-ke-routing.module';
import { CommonModule } from '@angular/common';
import { PrimeNGSharedModule } from 'src/app/shared/primeng-shared.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ThongKeComponent],
  imports: [PrimeNGSharedModule, ThongKeRoutingModule, CommonModule, SharedModule],

})
export class ThongKeModule {}

