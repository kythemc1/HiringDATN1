import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AgentThinkingLogDto, CreateUpdateAgentThinkingLogDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class AgentThinkingLogService {
  apiName = 'Default';
  

  create = (input: CreateUpdateAgentThinkingLogDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgentThinkingLogDto>({
      method: 'POST',
      url: '/api/AgentThinkingLog',
      params: { messageId: input.messageId, agentName: input.agentName, stepName: input.stepName, inputData: input.inputData, outputData: input.outputData, durationMs: input.durationMs, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId  },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/AgentThinkingLog',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgentThinkingLogDto>({
      method: 'GET',
      url: '/api/AgentThinkingLog',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AgentThinkingLogDto>>({
      method: 'POST',
      url: '/api/AgentThinkingLog/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateAgentThinkingLogDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgentThinkingLogDto>({
      method: 'PUT',
      url: '/api/AgentThinkingLog',
      params: { id, messageId: input.messageId, agentName: input.agentName, stepName: input.stepName, inputData: input.inputData, outputData: input.outputData, durationMs: input.durationMs, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId  },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
