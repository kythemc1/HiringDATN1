import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CoverLetterGenerationInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CoverLetterService {
  apiName = 'Default';
  

  generateCoverLetter = (input: CoverLetterGenerationInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/CoverLetter',
      params: { candidateName: input.candidateName, candidateEmail: input.candidateEmail, candidatePhone: input.candidatePhone, cvContent: input.cvContent, targetCompanyName: input.targetCompanyName, targetJobTitle: input.targetJobTitle, jobDescription: input.jobDescription, language: input.language, tone: input.tone },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
