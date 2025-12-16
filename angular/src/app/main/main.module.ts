import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';

// import { LanguageSwitchComponent } from './layout/language-switch.component';
import { UserMenuComponent } from './layout/user-menu.component';
import { MainComponent } from './main.component';

import { DatePipe, AsyncPipe } from '@angular/common';

import { BaseThemeSharedModule } from "@abp/ng.theme.shared";
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ConfirmDialog } from "primeng/confirmdialog";
import { Menu } from "primeng/menu";
import { PanelMenu } from "primeng/panelmenu";
import { Toast } from "primeng/toast";
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { SharedModule as AppSharedModule } from '../shared/shared.module';
// import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
// import { NotificationComponent } from './layout/notification/notification.component';

@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule,
    Menu,
    ConfirmDialog,
    Toast,
    PanelMenu,
    BaseThemeSharedModule,
    AsyncPipe,
    DynamicDialogModule,
    AppSharedModule,
    // OverlayPanelModule,
    DialogModule, 
],
  declarations: [
    // LanguageSwitchComponent,
    // NotificationComponent,
    UserMenuComponent,
    MainComponent,
  ],
  providers: [
    DatePipe,
    MessageService,
    ConfirmationService,
    DialogService,
  ],
})
export class MainModule { }
