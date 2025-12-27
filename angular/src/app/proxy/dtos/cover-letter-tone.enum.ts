import { mapEnumToOptions } from '@abp/ng.core';

export enum CoverLetterTone {
  Professional = 0,
  Startup = 1,
  Creative = 2,
  Confident = 3,
}

export const coverLetterToneOptions = mapEnumToOptions(CoverLetterTone);
