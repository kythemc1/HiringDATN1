import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CandidateProjectDto, CreateUpdateCandidateProjectDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CandidateProjectService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCandidateProjectDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateProjectDto>({
      method: 'POST',
      url: '/api/CandidateProject',
      params: { profileId: input.profileId, name: input.name, linkUrl: input.linkUrl, description: input.description, technologies: input.technologies, teamSize: input.teamSize, role: input.role, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/CandidateProject',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateProjectDto>({
      method: 'GET',
      url: '/api/CandidateProject',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CandidateProjectDto>>({
      method: 'POST',
      url: '/api/CandidateProject/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCandidateProjectDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateProjectDto>({
      method: 'PUT',
      url: '/api/CandidateProject',
      params: { id, profileId: input.profileId, name: input.name, linkUrl: input.linkUrl, description: input.description, technologies: input.technologies, teamSize: input.teamSize, role: input.role},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
