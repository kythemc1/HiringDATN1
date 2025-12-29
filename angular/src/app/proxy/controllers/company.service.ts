import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CompanyDto, CreateUpdateCompanyDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCompanyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyDto>({
      method: 'POST',
      url: '/api/Company',
      params: { name: input.name, description: input.description, website: input.website, logoUrl: input.logoUrl, address: input.address, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/Company',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyDto>({
      method: 'GET',
      url: '/api/Company',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CompanyDto>>({
      method: 'POST',
      url: '/api/Company/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCompanyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CompanyDto>({
      method: 'PUT',
      url: '/api/Company',
      params: { id, name: input.name, description: input.description, website: input.website, logoUrl: input.logoUrl, address: input.address},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
