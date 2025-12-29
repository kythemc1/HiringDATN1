import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CandidateExperienceDto, CreateUpdateCandidateExperienceDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CandidateExperienceService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCandidateExperienceDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateExperienceDto>({
      method: 'POST',
      url: '/api/CandidateExperience',
      params: { profileId: input.profileId, companyName: input.companyName, position: input.position, startDate: input.startDate, endDate: input.endDate, isCurrent: input.isCurrent, description: input.description, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/CandidateExperience',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateExperienceDto>({
      method: 'GET',
      url: '/api/CandidateExperience',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CandidateExperienceDto>>({
      method: 'POST',
      url: '/api/CandidateExperience/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCandidateExperienceDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateExperienceDto>({
      method: 'PUT',
      url: '/api/CandidateExperience',
      params: { id, profileId: input.profileId, companyName: input.companyName, position: input.position, startDate: input.startDate, endDate: input.endDate, isCurrent: input.isCurrent, description: input.description},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
