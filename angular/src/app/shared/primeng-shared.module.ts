import { NgModule } from '@angular/core';

// --- 1. Nhóm Form & Input (Dùng nhiều nhất) ---
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber'; // Nhập số, tiền tệ
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { PasswordModule } from 'primeng/password';

// --- 2. Nhóm Button & Action ---
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RippleModule } from 'primeng/ripple'; // Hiệu ứng sóng khi click

// --- 3. Nhóm Data & List (Hiển thị dữ liệu) ---
import { TableModule } from 'primeng/table'; // Quan trọng nhất cho trang Admin
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag'; // Hiển thị trạng thái (Active/Inactive)

// --- 4. Nhóm Overlay & Popup (Thông báo, Modal) ---
import { DialogModule } from 'primeng/dialog'; 
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Popup xác nhận xóa
import { ToastModule } from 'primeng/toast'; // Thông báo góc màn hình
import { TooltipModule } from 'primeng/tooltip';

// --- 5. Nhóm Layout & Menu ---
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';

@NgModule({
  exports: [
    // Form
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    RadioButtonModule,
    PasswordModule,

    // Button
    ButtonModule,
    SplitButtonModule,
    RippleModule,

    // Data
    TableModule,
    PaginatorModule,
    TagModule,

    // Overlay
    DialogModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,

    // Layout
    CardModule,
    ToolbarModule,
    MenuModule,
    PanelModule,
    DividerModule
  ]
})
export class PrimeNGSharedModule { }