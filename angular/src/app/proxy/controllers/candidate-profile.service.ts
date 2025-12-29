import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CandidateProfileDto, CreateUpdateCandidateProfileDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CandidateProfileService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCandidateProfileDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateProfileDto>({
      method: 'POST',
      url: '/api/CandidateProfile',
      params: { userId: input.userId, fullName: input.fullName, jobTitle: input.jobTitle, aboutMe: input.aboutMe, dateOfBirth: input.dateOfBirth, phoneNumber: input.phoneNumber, email: input.email, address: input.address, githubUrl: input.githubUrl, linkedInUrl: input.linkedInUrl, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/CandidateProfile',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateProfileDto>({
      method: 'GET',
      url: '/api/CandidateProfile',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CandidateProfileDto>>({
      method: 'POST',
      url: '/api/CandidateProfile/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCandidateProfileDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateProfileDto>({
      method: 'PUT',
      url: '/api/CandidateProfile',
      params: { id, userId: input.userId, fullName: input.fullName, jobTitle: input.jobTitle, aboutMe: input.aboutMe, dateOfBirth: input.dateOfBirth, phoneNumber: input.phoneNumber, email: input.email, address: input.address, githubUrl: input.githubUrl, linkedInUrl: input.linkedInUrl},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
