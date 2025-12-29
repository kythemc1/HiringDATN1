import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateUserFeedbackDto, SearchInputDto, UserFeedbackDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class UserFeedbackService {
  apiName = 'Default';
  

  create = (input: CreateUpdateUserFeedbackDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserFeedbackDto>({
      method: 'POST',
      url: '/api/UserFeedback',
      params: { messageId: input.messageId, rating: input.rating, comment: input.comment, isHelpful: input.isHelpful, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId, id: input.id },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/UserFeedback',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserFeedbackDto>({
      method: 'GET',
      url: '/api/UserFeedback',
      params: { id },
    },
    { apiName: this.apiName,...config });
  

  search = (input: SearchInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<UserFeedbackDto>>({
      method: 'POST',
      url: '/api/UserFeedback/search',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateUserFeedbackDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UserFeedbackDto>({
      method: 'PUT',
      url: '/api/UserFeedback',
      params: { id, messageId: input.messageId, rating: input.rating, comment: input.comment, isHelpful: input.isHelpful, lastModificationTime: input.lastModificationTime, lastModifierId: input.lastModifierId, creationTime: input.creationTime, creatorId: input.creatorId},
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
