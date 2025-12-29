import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AiPromptTemplateDto, CreateUpdateAiPromptTemplateDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class AiPromptTemplateService {
  apiName = 'Default';
  

  create = (input: CreateUpdateAiPromptTemplateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AiPromptTemplateDto>({
      method: 'POST',
      url: '/api/AiPromptTemplate',
      params: { code: input.code, templateContent: input.templateContent, description: input.description, modelConfigId: input.modelConfigId, temperature: input.temperature, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/AiPromptTemplate',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AiPromptTemplateDto>({
      method: 'GET',
      url: '/api/AiPromptTemplate',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AiPromptTemplateDto>>({
      method: 'POST',
      url: '/api/AiPromptTemplate/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateAiPromptTemplateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AiPromptTemplateDto>({
      method: 'PUT',
      url: '/api/AiPromptTemplate',
      params: { id, code: input.code, templateContent: input.templateContent, description: input.description, modelConfigId: input.modelConfigId, temperature: input.temperature, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
