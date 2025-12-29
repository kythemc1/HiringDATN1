import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ChatMessageDto, CreateUpdateChatMessageDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class ChatMessageService {
  apiName = 'Default';
  

  create = (input: CreateUpdateChatMessageDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChatMessageDto>({
      method: 'POST',
      url: '/api/ChatMessage',
      params: { sessionId: input.sessionId, role: input.role, content: input.content, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/ChatMessage',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChatMessageDto>({
      method: 'GET',
      url: '/api/ChatMessage',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ChatMessageDto>>({
      method: 'POST',
      url: '/api/ChatMessage/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateChatMessageDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChatMessageDto>({
      method: 'PUT',
      url: '/api/ChatMessage',
      params: { id, sessionId: input.sessionId, role: input.role, content: input.content, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
