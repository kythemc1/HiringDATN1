//#region Abp Modules
import { CoreModule, ListService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
//#endregion
//#region Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//#endregion
//#region Bootstrap Modules
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
//#endregion
//#region PrimeNg Modules
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
// import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
// import { DropdownModule } from 'primeng/dropdown'; // Import PrimeNG Dropdown
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule as PrimeNGFileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CardModule } from 'primeng/card';
//#endregion
//#region Extension Modules
import { NgxValidateCoreModule } from '@ngx-validate/core';
//#endregion


//#region Pipes
import { SafePipe } from './pipes/safe.pipe';
//#endregion
//#region Services
//#endregion

//#region Components
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { CommonButtonComponent } from './components/common-button/common-button.component';
//#endregion

const modules = [
  // Abp Modules
  CoreModule,
  ThemeSharedModule,

  // Angular Core Modules
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,

  // Ng Bootstrap
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbToastModule,

  // PrimeNg Modules
  AutoCompleteModule,
  ButtonModule,
  // CalendarModule,
  ChartModule,
  CheckboxModule,
  ChipModule,
  ConfirmDialogModule,
  DatePickerModule,
  DialogModule,
  // DropdownModule,
  FieldsetModule,
  PrimeNGFileUploadModule,
  IconFieldModule,
  InputGroupAddonModule,
  InputGroupModule,
  InputIconModule,
  InputNumberModule,
  InputTextModule,
  MenuModule,
  MessageModule,
  MultiSelectModule,
  PaginatorModule,
  PanelMenuModule,
  PanelModule,
  ProgressBarModule,
  RadioButtonModule,
  SelectModule,
  SliderModule,
  SplitButtonModule,
  TableModule,
  // TabViewModule,
  TagModule,
  TextareaModule,
  ToastModule,
  TooltipModule,
  ToggleSwitchModule,
  CardModule,
  // Extension Modules
  NgxValidateCoreModule,
];

// const components = [
//   // PageHeaderComponent,
//   // ImportExcelModalComponent,
//   // ExportExcelDialogComponent,
//   // ImportExcelDialogComponent,
//   // PdfViewerComponent, 
//   // SourceLabelComponent,
//   // StatusLabelComponent
//   // CommonButtonComponent,
// ];

const directives = [
  // ButtonBusyDirective,
];
const pipes = [
  SafePipe,
];

const services = [
  ListService,
  // CommonService,
];

@NgModule({
  declarations: [
    DynamicTableComponent,
    CommonButtonComponent,
    // ...components,
    ...directives,
    ...pipes,
  ],
  imports: [
    ...modules,
  ],
  exports: [
    ...modules,
    DynamicTableComponent,
    CommonButtonComponent,
    // ...components,
  ],
  providers: [
    ...services,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
  ],
})
export class SharedModule { }
