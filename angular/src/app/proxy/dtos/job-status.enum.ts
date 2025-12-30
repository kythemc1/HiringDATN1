import { mapEnumToOptions } from '@abp/ng.core';

export enum JobStatus {
  Draft = 0,
  Published = 1,
  Closed = 2,
}

export const jobStatusOptions = mapEnumToOptions(JobStatus);
