import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateUniversityDto, SearchInputDto, UniversityDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  apiName = 'Default';
  

  create = (input: CreateUpdateUniversityDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UniversityDto>({
      method: 'POST',
      url: '/api/University',
      params: { name: input.name, code: input.code, country: input.country, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/University',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UniversityDto>({
      method: 'GET',
      url: '/api/University',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<UniversityDto>>({
      method: 'POST',
      url: '/api/University/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateUniversityDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UniversityDto>({
      method: 'PUT',
      url: '/api/University',
      params: { id, name: input.name, code: input.code, country: input.country, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
