import { LocalizationService, PermissionService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { GlobalService, NavigationService } from '../shared/services';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  standalone: false,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  //#region Variables
  loading$ = this.globalService.loading$;

  navMenu: MenuItem[] = [];
  //#endregion

  //#region Constructor and Lifecycle
  constructor(
    private router: Router,
    private localizationService: LocalizationService,
    private permissionService: PermissionService,
    private globalService: GlobalService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.buildMenu();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe((event) => {
        this.buildMenu();
      });
  }
  //#endregion

  //#region Custom methods
  buildMenu(): void {
    const currentRouteUrl = this.router.url.split(/[?#]/)[0];
    this.navMenu = this.navigationService.getMenu().map(menu => {
      const output: MenuItem = {
        label: (menu.name.startsWith('::')) ? this.localizationService.instant(menu.name) : menu.name,
        icon: menu.icon,
        items: menu.items?.map((submenu) => ({
          label: (submenu.name.startsWith('::')) ? this.localizationService.instant(submenu.name) : submenu.name,
          icon: submenu.icon,
          visible: this.isMenuVisible(submenu.permissions),
          routerLink: submenu.route,
        })),
        visible: this.isMenuVisible(menu.permissions),
        routerLink: menu.route,
      };
      output.expanded = output.items?.length
        ? output.items.some((submenu) => submenu.routerLink === currentRouteUrl)
        : output.routerLink === currentRouteUrl;
      return output;
    });
  }
  //#endregion

  //#region Main methods
  //#endregion

  //#region Private methods
  private isMenuVisible(permissions: string[]): boolean {
    if (permissions == null) return true;

    if (permissions.length === 0) {
      return this.isGrantedAny('AbpIdentity.Users', 'AbpIdentity.Roles');
    }

    return this.isGrantedAny(...permissions);
  }

  private isGrantedAny(...permissions: string[]): boolean {
    const list = permissions.filter((p) => !!p && p.trim().length > 0);
    return this.permissionService.getGrantedPolicy(list.join(' || '));
  }
  //#endregion
}
