import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareControllersService {
  apiName = 'Default';
  

  getListRole = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: '/api/shared/roles',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
