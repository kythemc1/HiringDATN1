import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CandidateCertificateDto, CreateUpdateCandidateCertificateDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CandidateCertificateService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCandidateCertificateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateCertificateDto>({
      method: 'POST',
      url: '/api/CandidateCertificate',
      params: { profileId: input.profileId, name: input.name, issuer: input.issuer, issueDate: input.issueDate, expiryDate: input.expiryDate, credentialUrl: input.credentialUrl, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/CandidateCertificate',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateCertificateDto>({
      method: 'GET',
      url: '/api/CandidateCertificate',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CandidateCertificateDto>>({
      method: 'POST',
      url: '/api/CandidateCertificate/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCandidateCertificateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateCertificateDto>({
      method: 'PUT',
      url: '/api/CandidateCertificate',
      params: { id, profileId: input.profileId, name: input.name, issuer: input.issuer, issueDate: input.issueDate, expiryDate: input.expiryDate, credentialUrl: input.credentialUrl},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
