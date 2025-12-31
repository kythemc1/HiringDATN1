import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateJobPostingDto, JobPostingDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class JobPostionRecruitmentService {
  apiName = 'Default';
  

  create = (input: CreateUpdateJobPostingDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, JobPostingDto>({
      method: 'POST',
      url: '/api/JobPostionRecruitment',
      params: { companyId: input.companyId, title: input.title, jobDescription: input.jobDescription, jobRequirements: input.jobRequirements, benefits: input.benefits, salaryRange: input.salaryRange, location: input.location, status: input.status, isAiGenerated: input.isAiGenerated, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/JobPostionRecruitment',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, JobPostingDto>({
      method: 'GET',
      url: '/api/JobPostionRecruitment',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<JobPostingDto>>({
      method: 'POST',
      url: '/api/JobPostionRecruitment/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateJobPostingDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, JobPostingDto>({
      method: 'PUT',
      url: '/api/JobPostionRecruitment',
      params: { id, companyId: input.companyId, title: input.title, jobDescription: input.jobDescription, jobRequirements: input.jobRequirements, benefits: input.benefits, salaryRange: input.salaryRange, location: input.location, status: input.status, isAiGenerated: input.isAiGenerated },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
