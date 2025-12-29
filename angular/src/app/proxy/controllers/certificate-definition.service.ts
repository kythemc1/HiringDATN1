import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CertificateDefinitionDto, CreateUpdateCertificateDefinitionDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CertificateDefinitionService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCertificateDefinitionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CertificateDefinitionDto>({
      method: 'POST',
      url: '/api/CertificateDefinition',
      params: { name: input.name, issuer: input.issuer, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/CertificateDefinition',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CertificateDefinitionDto>({
      method: 'GET',
      url: '/api/CertificateDefinition',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CertificateDefinitionDto>>({
      method: 'POST',
      url: '/api/CertificateDefinition/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCertificateDefinitionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CertificateDefinitionDto>({
      method: 'PUT',
      url: '/api/CertificateDefinition',
      params: { id, name: input.name, issuer: input.issuer, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
