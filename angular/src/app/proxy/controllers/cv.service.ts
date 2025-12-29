import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CVDto, CreateUpdateCVDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CVService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCVDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CVDto>({
      method: 'POST',
      url: '/api/CVController/Create',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/CVController/delete',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CVDto>({
      method: 'GET',
      url: '/api/CVController',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CVDto>>({
      method: 'POST',
      url: '/api/CVController/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
