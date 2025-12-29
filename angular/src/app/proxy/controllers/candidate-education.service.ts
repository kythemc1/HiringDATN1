import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CandidateEducationDto, CreateUpdateCandidateEducationDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CandidateEducationService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCandidateEducationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateEducationDto>({
      method: 'POST',
      url: '/api/CandidateEducation',
      params: { profileId: input.profileId, schoolName: input.schoolName, degree: input.degree, major: input.major, startDate: input.startDate, endDate: input.endDate, gpa: input.gpa, description: input.description, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/CandidateEducation',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateEducationDto>({
      method: 'GET',
      url: '/api/CandidateEducation',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CandidateEducationDto>>({
      method: 'POST',
      url: '/api/CandidateEducation/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCandidateEducationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateEducationDto>({
      method: 'PUT',
      url: '/api/CandidateEducation',
      params: { id, profileId: input.profileId, schoolName: input.schoolName, degree: input.degree, major: input.major, startDate: input.startDate, endDate: input.endDate, gpa: input.gpa, description: input.description},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
