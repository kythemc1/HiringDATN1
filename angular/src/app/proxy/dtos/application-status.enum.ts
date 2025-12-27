import { mapEnumToOptions } from '@abp/ng.core';

export enum ApplicationStatus {
  Applied = 0,
  Screened = 1,
  Interview = 2,
  Rejected = 3,
  Offer = 4,
}

export const applicationStatusOptions = mapEnumToOptions(ApplicationStatus);
