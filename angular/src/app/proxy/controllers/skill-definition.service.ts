import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateSkillDefinitionDto, SearchInputDto, SkillDefinitionDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class SkillDefinitionService {
  apiName = 'Default';
  

  create = (input: CreateUpdateSkillDefinitionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SkillDefinitionDto>({
      method: 'POST',
      url: '/api/SkillDefinition',
      params: { name: input.name, category: input.category, description: input.description, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId  },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/SkillDefinition',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SkillDefinitionDto>({
      method: 'GET',
      url: '/api/SkillDefinition',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<SkillDefinitionDto>>({
      method: 'POST',
      url: '/api/SkillDefinition/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateSkillDefinitionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SkillDefinitionDto>({
      method: 'PUT',
      url: '/api/SkillDefinition',
      params: { id, name: input.name, category: input.category, description: input.description, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId  },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
