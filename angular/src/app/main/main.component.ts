import { AuthService, LocalizationService, PermissionService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { GlobalService, NavigationService } from '../shared/services';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { AppMenuItem } from '../shared/models';

@Component({
  standalone: false,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  //#region Variables
  loading$ = this.globalService.loading$;
  private currentUserRoles: string[] = [];

  navMenu: MenuItem[] = [];
  //#endregion

  //#region Constructor and Lifecycle
  constructor(
    private router: Router,
    private localizationService: LocalizationService,
    private permissionService: PermissionService,
    private authService: AuthService,
    private globalService: GlobalService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    void this.buildMenu();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(() => {
        void this.buildMenu();
      });
  }
  //#endregion

  //#region Custom methods
  async buildMenu(): Promise<void> {
    const currentRouteUrl = this.router.url.split(/[?#]/)[0];
    const roles = this.authService.isAuthenticated
      ? await this.navigationService.getListRoles()
      : [];
  
    this.currentUserRoles = this.normalizeRoles(roles);
  
    this.navMenu = this.navigationService.getMenu()
      // 🔥 FILTER MENU CHA
      .filter(menu => this.isMenuVisible(menu))
      .map(menu => {
  
        // 🔥 FILTER MENU CON
        const items = menu.items
          ?.filter(sub => this.isMenuVisible(sub))
          .map(submenu => ({
            label: submenu.name.startsWith('::')
              ? this.localizationService.instant(submenu.name)
              : submenu.name,
            icon: submenu.icon,
            routerLink: submenu.route,
          }));
  
        const output: MenuItem = {
          label: menu.name.startsWith('::')
            ? this.localizationService.instant(menu.name)
            : menu.name,
          icon: menu.icon,
          items,
          routerLink: menu.route,
        };
  
        output.expanded = items?.length
          ? items.some(sub => sub.routerLink === currentRouteUrl)
          : output.routerLink === currentRouteUrl;
  
        return output;
      });
  }
  
  //#endregion

  //#region Main methods
  //#endregion

  //#region Private methods
  private isMenuVisible(menu: AppMenuItem): boolean {
    if (!menu) {
      return true;
    }
  
    // Không có role khai báo → ẩn
    if (!menu.roles || menu.roles.length === 0) {
      return false;
    }
  
    return this.hasRoleAny(...menu.roles);
  }

  private hasRoleAny(...roles: string[]): boolean {
    const list = this.normalizeRoles(roles);
    if (!list.length) {
      return false;
    }

    return list.some((role) => this.currentUserRoles.includes(role));
  }

  private isGrantedAny(...permissions: string[]): boolean {
    const list = permissions.filter((p) => !!p && p.trim().length > 0);
    return this.permissionService.getGrantedPolicy(list.join(' || '));
  }

  private normalizeRoles(roles?: string[]): string[] {
    return (roles ?? [])
      .map((role) => role?.trim().toLowerCase())
      .filter((role): role is string => Boolean(role));
  }

  onNavClick(event: MouseEvent): void {
    
    // Nếu đang collapsed, chặn toggle submenu khi click vào header, cho phép click item leaf điều hướng
    const headerEl = (event.target as HTMLElement).closest('.p-panelmenu-header-link');
    if (headerEl) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  isSectionActive(item: MenuItem): boolean {
    const current = this.router.url.split(/[?#]/)[0];
    const link = typeof item.routerLink === 'string' ? item.routerLink : '';
    if (link && current.startsWith(link)) return true;
    if (item.items?.length) {
      return item.items.some(sm => {
        const smLink = typeof sm.routerLink === 'string' ? sm.routerLink : '';
        return smLink && current.startsWith(smLink);
      });
    }
    return false;
  }

  mapIcon(icon?: string): string {
    if (!icon) return 'menu';
    if (!/\s/.test(icon) && !icon.startsWith('pi')) return icon;
    const map: Record<string, string> = {
      'pi pi-home': 'home',
      'pi pi-briefcase': 'work',
      'pi pi-users': 'group',
      'pi pi-user': 'person',
      'pi pi-star': 'grade',
      'pi pi-cog': 'settings',
      'pi pi-sitemap': 'account_tree',
      'pi pi-book': 'menu_book',
      'pi pi-chart-bar': 'bar_chart',
      'pi pi-chart-line': 'show_chart',
      'pi pi-envelope': 'mail',
      'pi pi-file': 'description',
      'pi pi-list': 'list',
      'pi pi-shield': 'security',
      'pi pi-database': 'storage',
      'pi pi-globe': 'public',
      'pi pi-bell': 'notifications',
      'pi pi-calendar': 'event',
      'pi pi-chart-pie': 'pie_chart',
      'pi pi-folder': 'folder',
      'pi pi-clipboard': 'assignment',
      'pi pi-tags': 'sell',
    };
    return map[icon] || 'folder';
  }

  onSectionClick(index: number, item: MenuItem, event?: MouseEvent): void {
    if (item.items?.length) {
      // Prevent navigation when clicking a section header with children
      event?.preventDefault();
      // Allow toggling regardless of collapsed state so users can open lists
      item.expanded = !item.expanded;
      // Cập nhật đề mục cha khi người dùng tương tác vào section
    } 
  }
  //#endregion
}
