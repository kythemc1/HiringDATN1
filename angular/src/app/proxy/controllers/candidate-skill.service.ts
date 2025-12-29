import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CandidateSkillDto, CreateUpdateCandidateSkillDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CandidateSkillService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCandidateSkillDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateSkillDto>({
      method: 'POST',
      url: '/api/CandidateSkill',
      params: { profileId: input.profileId, skillDefinitionId: input.skillDefinitionId, level: input.level, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/CandidateSkill',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateSkillDto>({
      method: 'GET',
      url: '/api/CandidateSkill',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CandidateSkillDto>>({
      method: 'POST',
      url: '/api/CandidateSkill/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCandidateSkillDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateSkillDto>({
      method: 'PUT',
      url: '/api/CandidateSkill',
      params: { id, profileId: input.profileId, skillDefinitionId: input.skillDefinitionId, level: input.level},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
