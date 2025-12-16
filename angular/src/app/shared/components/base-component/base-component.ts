import { EnvironmentService, LocalizationService, PermissionService } from '@abp/ng.core';
import { Component, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
// import * as utils from '../../utils';
import { GlobalService } from '../../services';
// import { TableHelper } from '../../helpers/tableHelper';
// import { VinPermissionService } from '../../services/permissions.service';

@Component({
  standalone: false,
  template: '',
})
export abstract class AppBaseComponent {
  componentActive = true;
  firstLoaded = false;

  injector: Injector

  environment: EnvironmentService;
  localization: LocalizationService;
  // permission: PermissionService;
  // permission: VinPermissionService;


  confirmation: ConfirmationService;
  message: MessageService;
  // tableHelper: TableHelper;

  private globalService: GlobalService;
  //  utils = utils;

  constructor(injector: Injector) {
    this.injector = injector;
    this.environment = injector.get(EnvironmentService);
    this.localization = injector.get(LocalizationService);
    // this.permission = injector.get(PermissionService);
    // this.permission = injector.get(VinPermissionService);
    this.confirmation = injector.get(ConfirmationService);
    this.message = injector.get(MessageService);

    this.globalService = injector.get(GlobalService);
    // this.tableHelper = new TableHelper();
  }

  l(key: string, ...args: any[]): string {
    return this.localization.instant(key, ...args);
  }

  ls(...args: string[]) {
    return args.map((x) => {
      if (x.toUpperCase().lastIndexOf(':L') > 0) {
        return this.l(x.slice(0, -2)).toLowerCase();
      }

      if (x.toUpperCase().lastIndexOf(':U') > 0) {
        return this.l(x.slice(0, -2)).toUpperCase();
      }

      if (x.toUpperCase().lastIndexOf('+') > 0) {
        let length = +x.split('+')[1];
        return length > 0 ? this.l(x.split('+')[0], length) : this.l(x);
      }

      return this.l(x);
    }).join(' ');
  }

  isGranted(permissionName: string): boolean {
    // return this.permission.isGranted(permissionName);
    return true;
  }

  isGrantedAny(...permissions: string[]): boolean {
    const list = permissions.filter(p => !!p && p.trim().length > 0);
    // return this.permission.isGrantedAny(...list);
    return true;
  }

  isGrantedAll(...permissions: (string | null | undefined)[]): boolean {
    const list = permissions.filter(p => !!p && p.trim().length > 0);
    // return this.permission.isGrantedAll(...list);
    return true;
  }

  hasRole(code: string): boolean {
    // return this.permission.hasRole(code);
    return true;
  }

  hasRoleAny(...codes: string[]): boolean {
    // return this.permission.hasRoleAny(...codes);
    return true;
  }

  showLoading() {
    this.globalService.showLoading();
  }

  hideLoading() {
    this.globalService.hideLoading();
  }

  alertMessage(message: string): void {
    this.confirmation.confirm({
      key: 'global',
      message: message,
      header: 'Thông báo',
      rejectVisible: false,
    });
  }

  showSuccessMessage(text: string) {
    this.message.add({ severity: 'success', summary: 'Thông báo', detail: text, key: 'global', life: 3000 });
  }

  showWarnMessage(text: string) {
    this.message.add({ severity: 'warn', summary: 'Cảnh báo', detail: text, key: 'global', life: 3000 });
  }

  showErrorMessage(text: string) {
    this.message.add({ severity: 'error', summary: 'Lỗi', detail: text, key: 'global', life: 3000 });
  }
}
