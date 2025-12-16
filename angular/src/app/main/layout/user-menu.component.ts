import { AuthService, ConfigStateService, LocalizationService } from '@abp/ng.core';
import { DatePipe } from '@angular/common';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AppBaseComponent } from '../../shared/components/base-component/base-component';
import { MenuItem } from 'primeng/api';
import { interval, Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styles: [`
    #current-time {
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
    }

    #user-menu {
      display: flex;

      #user-account-name {
        margin-right: 8px;
        font-family: 'Roboto';
        font-size: 14px;
        font-weight: 500;
        line-height: 40px;
      }

      #user-avatar {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
    }
  `],
})
export class UserMenuComponent extends AppBaseComponent implements OnInit, OnDestroy {
  currentTime: string;
  currentTimeSubscription: Subscription | undefined;

  currentUser: any;
  userOptions: MenuItem[] = [
    { label: '::UserMenu:Profile', icon: 'pi pi-user', routerLink: '/account/manage' },
    { label: '::UserMenu:ChangePassword', icon: 'pi pi-key', routerLink: '/account/manage' },
    { label: '::UserMenu:ChangeAvatar', icon: 'pi pi-image', command: () => this.alertUnderconstruction() },
    { label: '::UserMenu:ChangeLanguage', icon: 'pi pi-language', command: () => this.alertUnderconstruction() },
    { separator: true },
    { label: '::UserMenu:Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  constructor(
    injector: Injector,
    private datePipe: DatePipe,
    private authService: AuthService,
    private configState: ConfigStateService,
    private localizationService: LocalizationService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.currentTimeSubscription = interval(1000).subscribe(() => {
      const now = new Date();
      this.currentTime = this.datePipe.transform(now, 'EEEE, dd/MM/yyyy - HH:mm');
    });

    this.currentUser = this.configState.getOne('currentUser');
    this.userOptions.forEach((option) => option.label = this.localizationService.instant(option.label));
    this.userOptions.unshift({ separator: true });
    this.userOptions.unshift({ label: this.currentUser.email, disabled: true });
  }

  ngOnDestroy(): void {
    if (this.currentTimeSubscription) {
      this.currentTimeSubscription.unsubscribe();
    }
  }

  getUserDisplayName() {
    return this.currentUser.surname && this.currentUser.name
      ? `${this.currentUser.surname} ${this.currentUser.surname}`
      : this.currentUser.userName
  }

  alertUnderconstruction() {
    this.message.add({ severity: 'warn', summary: 'Nhắc nhở', detail: 'Chức năng đang được cập nhật', key: 'global', life: 3000 });
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
