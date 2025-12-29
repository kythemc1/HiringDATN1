import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateJobPositionDto, JobPositionDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class JobPositionService {
  apiName = 'Default';
  

  create = (input: CreateUpdateJobPositionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, JobPositionDto>({
      method: 'POST',
      url: '/api/JobPosition',
      params: { name: input.name, alias: input.alias, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/JobPosition',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, JobPositionDto>({
      method: 'GET',
      url: '/api/JobPosition',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<JobPositionDto>>({
      method: 'POST',
      url: '/api/JobPosition/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateJobPositionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, JobPositionDto>({
      method: 'PUT',
      url: '/api/JobPosition',
      params: { id, name: input.name, alias: input.alias, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
