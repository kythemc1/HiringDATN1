import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AiModelConfigDto, CreateUpdateAiModelConfigDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class AiModelConfigService {
  apiName = 'Default';
  

  create = (input: CreateUpdateAiModelConfigDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AiModelConfigDto>({
      method: 'POST',
      url: '/api/AiModelConfig',
      params: { providerName: input.providerName, modelName: input.modelName, apiKey: input.apiKey, baseUrl: input.baseUrl, isActive: input.isActive, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/AiModelConfig',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AiModelConfigDto>({
      method: 'GET',
      url: '/api/AiModelConfig',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AiModelConfigDto>>({
      method: 'POST',
      url: '/api/AiModelConfig/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateAiModelConfigDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AiModelConfigDto>({
      method: 'PUT',
      url: '/api/AiModelConfig',
      params: { id, providerName: input.providerName, modelName: input.modelName, apiKey: input.apiKey, baseUrl: input.baseUrl, isActive: input.isActive, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
