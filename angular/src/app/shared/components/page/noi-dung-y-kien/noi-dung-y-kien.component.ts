import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { CreateTieuChiBaoCaoItemDto, CreateUpdateFileDinhKemDto } from '@proxy/administration/dtos';

import { MinioService } from '@proxy/administration/minio';
import { IFormFile } from '@proxy/microsoft/asp-net-core/http';
import { takeWhile } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from '@abp/ng.core';
import { IActionResult } from '@proxy/microsoft/asp-net-core/mvc/models';
import { AppBaseComponent } from '../../base-component/base-component';
import { FileHelperService } from '../../file-utils/file-utils.service';

export interface NoiDungItem {
  id: number;
  isDeMuc: boolean;
  title: string;
  subTitle?: string;
  agree?: boolean | null; // true: dong y, false: khong dong y
  reason?: string;
  attachments: CreateUpdateFileDinhKemDto[];
  collapsed?: boolean;
  summary?: string;
  tieuChiVersionId?: number;
  tieuChiChaVersionId?: number;
}

export interface NoiDungSection {
  id: number;
  romanId: string;
  title: string;
  collapsed: boolean;
  tieuChiVersionId?: number;
  tieuChiChaVersionId?: number;
  items: NoiDungItem[];
}

@Component({
  selector: 'app-noi-dung-y-kien',
  standalone: false,
  templateUrl: './noi-dung-y-kien.component.html',
  styleUrl: './noi-dung-y-kien.component.less',
})
export class NoiDungYKienComponent extends AppBaseComponent {
  @Input() sections: NoiDungSection[];
  @Input() disable: boolean = false;
  @Output() sectionsChange = new EventEmitter<NoiDungSection[]>();
  @Output() createDtosChange = new EventEmitter<CreateTieuChiBaoCaoItemDto[]>();
  createDtos: CreateTieuChiBaoCaoItemDto[] = [];
  apiName = environment.apis.default.url;
  constructor(
    injector: Injector,
    private restService: RestService,
    private fileHelperService: FileHelperService
  ) {
    super(injector);
  }

  toggleSection(section: NoiDungSection) {
    section.collapsed = !section.collapsed;
  }

  isItemVisible(item: any, allItems: any[]): boolean {
    // 1. Nếu item không có cha (là mục gốc), nó luôn hiển thị.
    if (!item.tieuChiChaId) {
      return true;
    }

    // 2. Tìm cha trực tiếp của item.
    const parent = allItems.find(p => p.id === item.tieuChiChaId);

    // 3. Nếu không tìm thấy cha (dữ liệu lỗi), cứ hiển thị.
    if (!parent) {
      return true;
    }

    // 4. Nếu cha đang bị đóng (collapsed), item này BỊ ẨN.
    if (parent.collapsed) {
      return false;
    }

    // 5. Nếu cha không bị đóng, tiếp tục kiểm tra ông (đệ quy).
    //    Item này chỉ hiển thị nếu cha của nó cũng hiển thị.
    return this.isItemVisible(parent, allItems);
  }

  toggleItem(clickedItem: NoiDungItem, allItems: NoiDungItem[]): void {
    // 1. Đảo ngược trạng thái 'collapsed' của item được click
    clickedItem.collapsed = !clickedItem.collapsed;

    // 2. NẾU VỪA ĐÓNG LẠI (collapsed = true)
    //    thì buộc tất cả các con/cháu cũng phải chuyển sang 'collapsed = true'.
    if (clickedItem.collapsed && clickedItem.id) {
      this.collapseAllDescendants(clickedItem.id, allItems);
    }
  }

  private collapseAllDescendants(parentId: number, allItems: any[]): void {
    const children = allItems.filter(item => item.tieuChiChaId === parentId);

    for (const child of children) {
      // Đóng con này lại
      child.collapsed = true;

      // Và tiếp tục đóng tất cả các cháu
      if (child.id) {
        this.collapseAllDescendants(child.id, allItems);
      }
    }
  }

  getGlobalIndex(sectionIndex: number, itemIndex: number): number {
    let index = 1;

    // Duyệt qua các section trước section hiện tại
    for (let i = 0; i < sectionIndex; i++) {
      // Chỉ cộng các item không phải đề mục
      index += this.sections[i].items.filter(item => !item.isDeMuc).length;
    }

    // Cộng các item không phải đề mục trong section hiện tại, trước item hiện tại
    const currentItems = this.sections[sectionIndex].items.slice(0, itemIndex);
    index += currentItems.filter(item => !item.isDeMuc).length;

    return index;
  }

  triggerFileInput(sIdx: number, iIdx: number) {
    const el = document.getElementById(`file_${sIdx}_${iIdx}`) as HTMLInputElement | null;
    el?.click();
  }

  onFileSelect(event: Event, sIdx: number, iIdx: number) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const files = Array.from(input.files);

    // 1. Check dung lượng
    const maxSize = environment.uploadConfig.maxFileSize;

    const validSizeFiles = files.filter(f => f.size <= maxSize);
    const oversizedFiles = files.filter(f => f.size > maxSize);

    if (oversizedFiles.length) {
      this.showWarnMessage(
        `Một số file vượt quá ${environment.uploadConfig.maxFileSizeMB}MB đã bị loại`
      );
    }

    if (!validSizeFiles.length) return;

    // 2. Check loại file
    const validFiles = validSizeFiles.filter(f =>
      this.isFileAllowed(
        f,
        this.getDefaultFileUploadConfig().allowedExtensions,
        this.getDefaultFileUploadConfig().allowedMimeTypes
      )
    );

    const invalids = validSizeFiles.filter(
      f =>
        !this.isFileAllowed(
          f,
          this.getDefaultFileUploadConfig().allowedExtensions,
          this.getDefaultFileUploadConfig().allowedMimeTypes
        )
    );

    if (invalids.length) {
      this.showWarnMessage('Một số file không hợp lệ đã bị loại');
    }

    if (!validFiles.length) return;

    // 1. Tạo FormData
    const formData = new FormData();
    validFiles.forEach((file: File) => {
      // Key 'fileUploads' phải khớp 100% với tên tham số C#
      // [FromForm] List<IFormFile> fileUploads
      formData.append('fileUploads', file, file.name);
    });

    this.showLoading();
    this.restService
      .request<any, IActionResult>(
        {
          method: 'POST',
          url: '/api/minio/upload-multi-file',
          body: formData,
        },
        { apiName: this.apiName }
      )
      .subscribe({
        next: res => {
          if ((!res as any) || !(res as any).files?.length) {
            this.showWarnMessage('Không có file nào được trả về từ server');
            return;
          }
          const fileData: CreateUpdateFileDinhKemDto[] = (res as any).files.map((f: any) => ({
            id: f.id,
            tenFile: f.tenFile,
            duongDanFile: f.duongDanFile,
            kieuFile: f.kieuFile,
            dungLuongFile: f.dungLuongFile,
            controlsId: sIdx.toString() + iIdx.toString(),
          }));
          this.sections[sIdx].items[iIdx].attachments.push(...fileData);
          this.updateDto();
          this.hideLoading();
        },
        error: err => {
          console.error('Upload lỗi:', err);
          this.hideLoading();
          this.showErrorMessage('Upload file thất bại');
        },
      });
  }

  removeFile(sIdx: number, iIdx: number, fileIndex: number) {
    this.sections[sIdx].items[iIdx].attachments.splice(fileIndex, 1);
    this.updateDto();
  }

  buildCreateDtos(): CreateTieuChiBaoCaoItemDto[] {
    const result: CreateTieuChiBaoCaoItemDto[] = [];
    for (const section of this.sections) {
      const dto: CreateTieuChiBaoCaoItemDto = {
        tieuChiVersionId: Number(section.id),
        moTa: '',
        isDongY: false,
        isXinSCIC: false,
        lyDo: '',
        yKienKhac: '',
        banPhoiHopIds: [],
        fileDinhKems: null,
      };
      result.push(dto);
      for (const item of section.items) {
        const dto: CreateTieuChiBaoCaoItemDto = {
          tieuChiVersionId: item.id,
          moTa: item.summary || '',
          isDongY: !!item.agree || true,
          isXinSCIC: false,
          lyDo: item.reason || '',
          fileDinhKems: item.attachments,
          banPhoiHopIds: null,
        };
        result.push(dto);
      }
    }

    this.createDtos = result;
    return result;
  }

  updateDto() {
    this.createDtos = this.buildCreateDtos();
    this.createDtosChange.emit(this.createDtos);
    this.sectionsChange.emit(this.sections);
  }

  isFileAllowed(
    file: File,
    allowedExtensions: Set<string>,
    allowedMimeTypes: Set<string>
  ): boolean {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    return allowedExtensions.has(ext) || allowedMimeTypes.has(file.type);
  }

  getDefaultFileUploadConfig() {
    return {
      acceptedTypes: '.csv,.xlsx,.docx,.pdf,.doc',
      allowedExtensions: new Set(['csv', 'xlsx', 'docx', 'pdf', 'doc']),
      allowedMimeTypes: new Set([
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'application/msword', // <-- MIME type cho .doc
      ]),
    };
  }

  calculateItemDepth(item: any, allItems: any[]): number {
    let depth = 0;
    let currentItem = item;

    while (currentItem && currentItem.tieuChiChaId) {
      const parent = allItems.find(p => p.id === currentItem.tieuChiChaId);
      if (parent) {
        depth++;
        currentItem = parent;
      } else {
        break;
      }
    }
    return depth;
  }

  inputEntirely = false;

  validateEntireInput(): void {
    this.inputEntirely = this.sections.every(section =>
      section.items.every(item => {
        // Bỏ qua đề mục
        if (item.isDeMuc) return true;

        const hasSummary = item.summary && item.summary.trim().length > 0;

        const hasAgree = item.agree === true || item.agree === false;

        const hasReason = item.reason && item.reason.trim().length > 0;

        return hasSummary && hasAgree && hasReason;
      })
    );
  }
}
