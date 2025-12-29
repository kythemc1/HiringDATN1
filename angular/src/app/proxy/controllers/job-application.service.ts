import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateJobApplicationDto, JobApplicationDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  apiName = 'Default';
  

  create = (input: CreateUpdateJobApplicationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, JobApplicationDto>({
      method: 'POST',
      url: '/api/JobApplication',
      params: { jobId: input.jobId, candidateProfileId: input.candidateProfileId, profileSnapshotJson: input.profileSnapshotJson, coverLetter: input.coverLetter, status: input.status, aiMatchingScore: input.aiMatchingScore, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/JobApplication',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, JobApplicationDto>({
      method: 'GET',
      url: '/api/JobApplication',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<JobApplicationDto>>({
      method: 'POST',
      url: '/api/JobApplication/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateJobApplicationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, JobApplicationDto>({
      method: 'PUT',
      url: '/api/JobApplication',
      params: { id, jobId: input.jobId, candidateProfileId: input.candidateProfileId, profileSnapshotJson: input.profileSnapshotJson, coverLetter: input.coverLetter, status: input.status, aiMatchingScore: input.aiMatchingScore},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
