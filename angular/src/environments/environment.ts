import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44322/',
  redirectUri: baseUrl,
  clientId: 'HiringDATN_App',
  responseType: 'code',
  scope: 'offline_access HiringDATN',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'HiringDATN',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44322',
      rootNamespace: 'HiringDATN',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
