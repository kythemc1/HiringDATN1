import {
  Component,
  computed,
  signal,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  Injector,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedDanhMucService } from '@proxy/administration/shared/shared-danh-muc.service';
import { RestService } from '@abp/ng.core';
import { environment } from 'src/environments/environment';
import { IActionResult } from '@proxy/microsoft/asp-net-core/mvc/models';
import { FileHelperService } from '../../file-utils/file-utils.service';
import { AppBaseComponent } from '../../base-component/base-component';
import { ChuyenVienXuLyCongViecService } from '@proxy/administration/services/chuyen-vien-xu-ly-cong-viec.service';
import {
  CreateVuongMacForBaoCaoByChuyenVienDto,
  CreateNoiDungTraLoiForTieuChiByChuyenVienDto,
  CreateUpdateFileDinhKemDto,
  FileDinhKemDto,
} from '@proxy/administration/dtos/models';
import { TnpcItem, NoiDungXuLyDto, NoiDungPhoiHopDto } from './pages';
import {
  isFileAllowed as isFileAllowedUtil,
  getDefaultFileUploadConfig as getDefaultFileUploadConfigUtil,
  parseDateToVN,
  getGroupLabel as getGroupLabelUtil,
} from './pages';
import { mapSectionsToTnpcItems } from './pages/mappers';
import { mapFileDtosToDisplay } from './pages/file-view-model';
import {
  triggerInput,
  onFileSelectForRow,
  removeFileFromRow,
  onFileSelectForReply,
  removeReplyFileFromRow,
  onFileSelectBottomSection,
  removeBottomFileInLists,
} from './pages/files.page';

@Component({
  standalone: false,
  selector: 'app-noi-dung-tong-hop',
  templateUrl: './noi-dung-tong-hop.component.html',
  styleUrls: ['./noi-dung-tong-hop.component.less'],
})
export class NoiDungTongHopComponent extends AppBaseComponent implements OnInit, OnChanges {
  @Input() sections: any[] = [];
  // Nhận baoCaoId từ component cha để dùng khi gửi vướng mắc
  @Input() baoCaoId: number | null | undefined;
  @Input() issues: any[] = [];
  // Khi true sẽ khóa tất cả các trường và hành động trong component
  @Input() disabled: boolean = false;
  @Input() isXinSCIC: boolean | null = null;
  @Input() isNhieuBanXuLy: boolean | null = null;
  @Input() formKey: string | null = null;
  @Input() isChuyenVienXuLy: boolean | null = null;
  @Input() isLanhDaoBanChucNang: boolean | null = null;
  dataSig = signal<TnpcItem[]>([]);
  // attachments at bottom section
  filesToTrinh: CreateUpdateFileDinhKemDto[] = [];
  filesToTrinhHDQT: CreateUpdateFileDinhKemDto[] = [];
  filesCongVan: CreateUpdateFileDinhKemDto[] = [];
  filesDinhKem: CreateUpdateFileDinhKemDto[] = [];
  // view models for display (name/url) to be template-compatible
  filesToTrinhDisplay: { id?: string | number; name: string; url?: string }[] = [];
  filesToTrinhHDQTDisplay: { id?: string | number; name: string; url?: string }[] = [];
  filesCongVanDisplay: { id?: string | number; name: string; url?: string }[] = [];
  filesDinhKemDisplay: { id?: string | number; name: string; url?: string }[] = [];
  // track note open state per item id
  noteOpen = signal<Record<string, boolean>>({});
  @Input() noiDungXuLyDtosInput: NoiDungXuLyDto[] | null = null;
  @Input() noiDungPhoiHopDtosInput: NoiDungPhoiHopDto[] | null = null;
  // Dữ liệu file đính kèm cấp báo cáo (từ cha)
  @Input() bottomFileDinhKemDtos: (FileDinhKemDto | CreateUpdateFileDinhKemDto)[] | null = null;
  @Output() sentPhoiHop = new EventEmitter<NoiDungPhoiHopDto>();
  @Output() emitFileUploaded = new EventEmitter<CreateUpdateFileDinhKemDto[]>();

  // Cờ ẩn/hiện cho attachments-section
  showToTrinh = true;
  showToTrinhHDQT = true;
  showCongVan = true;
  showDinhKem = true;

  // UI state cho mục Vướng mắc
  showIssues = true;
  issueDraft = '';

  // options of ban chuc nang to map ids to labels
  banChucNangOptions: { label: string; value: number | null }[] = [];

  apiName = environment.apis.default.url;

  constructor(
    injector: Injector,
    private sharedDanhMucService: SharedDanhMucService,
    private cdr: ChangeDetectorRef,
    private restService: RestService,
    private fileHelperService: FileHelperService,
    private chuyenVienXuLyCongViecService: ChuyenVienXuLyCongViecService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadBanChucNangOptions();
    this.dataSig.set(this.mapSectionsToTnpcItems(this.sections || []));
    this.syncBottomFilesFromInput();
    this.updateAttachmentVisibility();
    // Demo dữ liệu cho mục Vướng mắc (có thể xoá khi nối API)
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'sections' in changes ||
      'noiDungXuLyDtosInput' in changes ||
      'noiDungPhoiHopDtosInput' in changes ||
      'bottomFileDinhKemDtos' in changes
    ) {
      this.dataSig.set(this.mapSectionsToTnpcItems(this.sections || []));
      this.syncBottomFilesFromInput();
      this.cdr.markForCheck();
    }
    if ('isXinSCIC' in changes || 'isNhieuBanXuLy' in changes) {
      this.updateAttachmentVisibility();
      this.cdr.markForCheck();
    }
  }

  private mapSectionsToTnpcItems(sections: any[]): TnpcItem[] {
    return mapSectionsToTnpcItems(
      sections,
      this.banChucNangOptions,
      this.noiDungXuLyDtosInput,
      this.noiDungPhoiHopDtosInput
    );
  }

  private loadBanChucNangOptions(): void {
    this.sharedDanhMucService.getListBanChucNang().subscribe({
      next: list => {
        const mapped = (list || []).map(d => ({
          label: (d as any).displayName ?? '-',
          value: (d as any).id ?? null,
        }));
        this.banChucNangOptions = mapped;
        // re-map to update labels
        this.dataSig.set(this.mapSectionsToTnpcItems(this.sections || []));
        this.cdr.markForCheck();
      },
      error: _ => {
        this.banChucNangOptions = [];
      },
    });
  }

  // Đồng bộ file dưới cùng từ input (filter theo controlsId)
  private syncBottomFilesFromInput(): void {
    const source = Array.isArray(this.bottomFileDinhKemDtos) ? this.bottomFileDinhKemDtos : [];

    const normalize = (f: any): CreateUpdateFileDinhKemDto => ({
      id: f?.id ?? 0,
      tenFile: f?.tenFile ?? f?.fileName ?? f?.name ?? '-',
      duongDanFile: f?.duongDanFile ?? f?.fileUrl ?? f?.url ?? '',
      kieuFile: f?.kieuFile ?? f?.contentType ?? f?.type ?? '',
      controlsId: f?.controlsId,
    });

    const list = source.map(normalize);
    // Lấy tệp tờ trình theo controlsId cũ nếu có
    //this.filesToTrinh = list.filter(x => x.controlsId === 'toTrinh');
    this.filesToTrinhHDQT = list.filter(x => x.controlsId === 'toTrinhHDQT');
    this.filesCongVan = list.filter(x => x.controlsId === 'congVan');
    this.filesDinhKem = list.filter(x => x.controlsId === 'dinhKem');

    //lấy file đầu tiên có controlsId = 'LanhDaoBanChucNangKyToTrinh'
    const ldKyToTrinh = list.filter(x => x.controlsId === 'LanhDaoBanChucNangKyToTrinh');
    if (ldKyToTrinh.length > 0) {
      this.filesToTrinh = [ldKyToTrinh[0]];
    }

    this.recomputeDisplayFromDtos();
  }

  onSubmitIssue(): void {
    this.showLoading();
    if (this.disabled) return;
    const text = (this.issueDraft || '').trim();
    if (!text) return;
    const bcId = this.baoCaoId;

    const payload: CreateVuongMacForBaoCaoByChuyenVienDto = {
      baoCaoId: Number(bcId),
      noiDung: text,
    };
    this.chuyenVienXuLyCongViecService.createVuongMacForBaoCao(payload).subscribe({
      next: _ => {
        this.hideLoading();
        const nowUtc = new Date();
        const vnDate = new Date(nowUtc.getTime() + 7 * 3600 * 1000);

        this.issues = [...this.issues, { ngayThucHien: vnDate, noiDung: text }];
        this.issueDraft = '';
        this.cdr.markForCheck();
      },
      error: err => {
        console.error('createVuongMacForBaoCao lỗi', err);
      },
    });
  }

  // Track expanded state by id
  expanded = signal<Record<string, boolean>>({});

  // Flat view for table rendering with expansion applied
  flatItems = computed(() => {
    const out: (TnpcItem & { isGroup: boolean })[] = [];

    const visit = (item: TnpcItem) => {
      const isGroup = !!item.children?.length && item.level === 0;
      out.push({ ...item, isGroup });

      const isOpen = this.expanded()[item.id];
      if (item.children && isOpen) {
        for (const c of item.children) visit(c);
      }
    };

    for (const root of this.dataSig()) visit(root);
    return out;
  });

  isExpanded(id: string): boolean {
    return !!this.expanded()[id];
  }

  // note open helpers
  isNoteOpen(id: string): boolean {
    return !!this.noteOpen()[id];
  }

  toggleNote(item: TnpcItem): void {
    const cur = this.noteOpen();
    const next = { ...cur, [item.id]: !cur[item.id] };
    this.noteOpen.set(next);
  }

  toggle(item: TnpcItem): void {
    const cur = this.expanded();
    const next = { ...cur, [item.id]: !cur[item.id] };
    // If collapsing a group, also collapse all nested children to keep state tidy
    if (cur[item.id]) {
      this.collapseDescendants(item, next);
    }
    this.expanded.set(next);
  }

  private collapseDescendants(item: TnpcItem, state: Record<string, boolean>) {
    if (!item.children) return;
    for (const c of item.children) {
      state[c.id] = false;
      this.collapseDescendants(c, state);
    }
  }

  // ========== phần liên quan đến upload file ==========
  triggerFileInput(inputId: string): void {
    if (this.disabled) return;
    triggerInput(inputId);
  }

  onFileSelect(event: Event, row: TnpcItem): void {
    onFileSelectForRow(event, row, {
      disabled: this.disabled,
      restService: this.restService,
      apiName: this.apiName,
      cdr: this.cdr,
      getDefaultFileUploadConfig: () => this.getDefaultFileUploadConfig(),
      isFileAllowed: (f, ext, mime) => this.isFileAllowed(f, ext, mime),
    });
  }

  removeFile(row: TnpcItem, index: number): void {
    removeFileFromRow(row, index, { disabled: this.disabled, cdr: this.cdr });
  }

  // Upload for bottom attachments section
  onFileSelectBottom(
    event: Event,
    listName: 'toTrinh' | 'congVan' | 'dinhKem' | 'toTrinhHDQT'
  ): void {
    const http = this.injector.get(HttpClient);
    const apiUrl = `${this.environment.getApiUrl('default')}/api/minio/upload-multi-file`;

    onFileSelectBottomSection(event, listName, {
      disabled: this.disabled,
      httpClient: http,
      url: apiUrl,
      cdr: this.cdr,
      showLoading: () => this.showLoading(),
      hideLoading: () => this.hideLoading(),
      getDefaultFileUploadConfig: () => this.getDefaultFileUploadConfig(),
      isFileAllowed: (f, ext, mime) => this.isFileAllowed(f, ext, mime),
      showSuccessMessage: msg => this.showSuccessMessage(msg),
      showErrorMessage: msg => this.showErrorMessage(msg),
      onSuccess: (mapped, input) => {
        const isReplace = !!this.isLanhDaoBanChucNang;
        switch (listName) {
          case 'toTrinh':
            this.filesToTrinh = isReplace ? mapped : [...this.filesToTrinh, ...mapped];
            break;
          case 'toTrinhHDQT':
            this.filesToTrinhHDQT = isReplace ? mapped : [...this.filesToTrinhHDQT, ...mapped];
            break;
          case 'congVan':
            this.filesCongVan = isReplace ? mapped : [...this.filesCongVan, ...mapped];
            break;
          case 'dinhKem':
            this.filesDinhKem = isReplace ? mapped : [...this.filesDinhKem, ...mapped];
            break;
        }
        this.recomputeDisplayFromDtos();
        this.emitFileUploaded.emit(mapped);
        if (input) input.value = '';
      },
    });
  }

  removeBottomFile(listName: 'toTrinh' | 'congVan' | 'dinhKem' | 'toTrinhHDQT', index: number): void {
    removeBottomFileInLists(
      listName,
      index,
      {
        filesToTrinh: this.filesToTrinh,
        filesToTrinhHDQT: this.filesToTrinhHDQT,
        filesCongVan: this.filesCongVan,
        filesDinhKem: this.filesDinhKem,
      },
      { disabled: this.disabled, cdr: this.cdr, recompute: () => this.recomputeDisplayFromDtos() }
    );
    switch (listName) {
      case 'toTrinh':
        this.emitFileUploaded.emit(this.filesToTrinh);
        break;
      case 'toTrinhHDQT':
        this.emitFileUploaded.emit(this.filesToTrinhHDQT);
        break;
      case 'congVan':
        this.emitFileUploaded.emit(this.filesCongVan);
        break;
      case 'dinhKem':
        this.emitFileUploaded.emit(this.filesDinhKem);
        break;
    }
  }

  isFileAllowed(
    file: File,
    allowedExtensions: Set<string>,
    allowedMimeTypes: Set<string>
  ): boolean {
    return isFileAllowedUtil(file, allowedExtensions, allowedMimeTypes);
  }

  getDefaultFileUploadConfig() {
    return getDefaultFileUploadConfigUtil();
  }

  // Tính toán ẩn/hiện cho attachments-section dựa theo isXinSCIC và isNhieuBanXuLy
  public updateAttachmentVisibility(): void {
    const xin = !!this.isXinSCIC;

    if (!xin) {
      // Hiển thị 3 file: tờ trình, công văn, đính kèm
      this.showToTrinh = true;
      this.showToTrinhHDQT = false;
      this.showCongVan = true;
      this.showDinhKem = true;
    } else {
      // Trường hợp xin=true, nhieu=true: theo yêu cầu hiển thị mỗi file đính kèm
      this.showToTrinh = false;
      this.showToTrinhHDQT = true;
      this.showCongVan = false;
      this.showDinhKem = true;
    }
  }

  // Helper cho template: kiểm tra ẩn/hiện theo tên list
  public isAttachmentVisible(listName: 'toTrinh' | 'congVan' | 'dinhKem'| 'toTrinhHDQT'): boolean {
    switch (listName) {
      case 'toTrinh':
        return this.showToTrinh;
      case 'congVan':
        return this.showCongVan;
      case 'dinhKem':
        return this.showDinhKem;
        case 'toTrinhHDQT':
          return this.showToTrinhHDQT;
      default:
        return false;
    }
  }

  // Map DTO arrays to display arrays (name/url) for template compatibility
  private recomputeDisplayFromDtos(): void {
    this.filesToTrinhDisplay = mapFileDtosToDisplay(this.filesToTrinh);
    this.filesCongVanDisplay = mapFileDtosToDisplay(this.filesCongVan);
    this.filesDinhKemDisplay = mapFileDtosToDisplay(this.filesDinhKem);
    this.filesToTrinhHDQTDisplay = mapFileDtosToDisplay(this.filesToTrinhHDQT);
  }

  // Trả về danh sách { tieuChiBaoCaoId, deMucId, noiDung, isXuLy }
  public collectReplies(): {
    tieuChiBaoCaoId: number;
    deMucId: number | null;
    noiDung: string;
    isXuLy: boolean;
  }[] {
    const out: {
      tieuChiBaoCaoId: number;
      deMucId: number | null;
      noiDung: string;
      isXuLy: boolean;
    }[] = [];
    const roots = this.dataSig();
    for (const group of roots) {
      const items = group.children || [];
      for (const item of items) {
        const leafId = Number(item.id);
        if (Number.isNaN(leafId)) continue;
        const replies = item.children || [];
        for (const r of replies) {
          const isXuLy = (r as any)?.isXuLy === true;
          const content = (r.replyContent || '').toString().trim();
          const deMucId = (r as any)?.deMucId ?? null;
          // Thu thập mọi nội dung người dùng nhập (không bắt buộc isXuLy)
          if (content) {
            out.push({ tieuChiBaoCaoId: leafId, deMucId, noiDung: content, isXuLy });
          }
        }
      }
    }
    return out;
  }

  parseDate(dateStr: string): string {
    return parseDateToVN(dateStr);
  }

  //  phân biệt parentIsXuLy
  public getGroupLabel(row: { parentIsXuLy?: boolean } | null | undefined): string {
    return getGroupLabelUtil(row);
  }

  public onViewAttachment(a: any, b?: any): void {
    const event: any = b !== undefined ? a : undefined;
    const f: any = b !== undefined ? b : a;

    try {
      if (event?.preventDefault) {
        event.preventDefault();
        event.stopPropagation?.();
      }

      const duongDanFile = f?.duongDanFile ?? f?.url ?? f?.fileUrl ?? '';
      const tenFile = f?.tenFile ?? f?.tenTep ?? f?.fileName ?? f?.name ?? '';

      if (!duongDanFile) {
        console.error('Không xác định được duongDanFile từ đối tượng file', f);
        return;
      }

      this.fileHelperService.viewAttachment({ duongDanFile, tenFile });
    } catch (err) {
      console.error('onViewAttachment error', err);
    }
  }
}
