import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenerateJobDescriptionService {
  apiName = 'Default';
  

  generateJobDescription = (jobTitle: string, specificRequirements: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/GenerateJobDescription/mo-ta-cong-viec',
      params: { jobTitle, specificRequirements },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
