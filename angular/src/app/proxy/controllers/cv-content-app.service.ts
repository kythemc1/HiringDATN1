import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GenerateObjectiveInputDto, OptimizeWorkExperienceInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CvContentAppService {
  apiName = 'Default';
  

  generateCareerObjective = (input: GenerateObjectiveInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/CvContent/muc-tieu-nghe-nghiep',
      params: { currentRole: input.currentRole, targetCompanyName: input.targetCompanyName, targetJobTitle: input.targetJobTitle, yearsOfExperience: input.yearsOfExperience },
    },
    { apiName: this.apiName,...config });
  

  optimizeWorkExperience = (input: OptimizeWorkExperienceInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/CvContent/kinh-nghiem-lam-viec',
      params: { jobTitle: input.jobTitle, companyName: input.companyName, rawDescription: input.rawDescription },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
