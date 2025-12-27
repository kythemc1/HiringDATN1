import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ChatSessionDto, CreateUpdateChatSessionDto, SearchInputDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class ChatSessionService {
  apiName = 'Default';
  

  create = (input: CreateUpdateChatSessionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChatSessionDto>({
      method: 'POST',
      url: '/api/ChatSession',
      params: { userId: input.userId, title: input.title, sessionType: input.sessionType, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId  },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/ChatSession',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChatSessionDto>({
      method: 'GET',
      url: '/api/ChatSession',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ChatSessionDto>>({
      method: 'POST',
      url: '/api/ChatSession/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateChatSessionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChatSessionDto>({
      method: 'PUT',
      url: '/api/ChatSession',
      params: { id, userId: input.userId, title: input.title, sessionType: input.sessionType, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId  },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
