import { mapEnumToOptions } from '@abp/ng.core';

export enum SkillLevel {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
  Expert = 4,
  Master = 5,
}

export const skillLevelOptions = mapEnumToOptions(SkillLevel);
