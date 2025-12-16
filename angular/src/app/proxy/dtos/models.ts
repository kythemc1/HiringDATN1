import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface AiModelConfigDto extends AuditedEntityDto<number> {
  providerName?: string;
  modelName?: string;
  apiKey?: string;
  baseUrl?: string;
  isActive?: boolean;
}

export interface CreateUpdateAiModelConfigDto extends AuditedEntityDto<number> {
  providerName?: string;
  modelName?: string;
  apiKey?: string;
  baseUrl?: string;
  isActive?: boolean;
}

export interface SearchInputDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}
