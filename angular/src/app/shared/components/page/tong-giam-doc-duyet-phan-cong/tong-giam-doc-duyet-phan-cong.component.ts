import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SharedDanhMucService } from '@proxy/administration/shared/shared-danh-muc.service';
import { MessageService } from 'primeng/api';

interface NoiDungItem {
  id: number;
  title: string;
  subTitle?: string;
  summary?: string;
  agree?: boolean | null; // true: dong y, false: khong dong y
  reason?: string;
  xinScic?: boolean;
  soTienSCIC?:number;
  // assignment propagated from leaf nodes
  banXuLyId?: number | null;
  banPhoiHopIds?: number[] | null;
  attachments: File[];
  collapsed?: boolean;
}

interface NoiDungSection {
  id: string;
  title: string; 
  collapsed: boolean;
  xuLyBan?: number | null;
  phoiHopBan?: number[] | null;
  items: NoiDungItem[];
}

@Component({
  selector: 'app-tong-giam-doc-duyet-phan-cong',
  standalone: false,
  templateUrl:'./tong-giam-doc-duyet-phan-cong.component.html' ,
  styleUrl: './tong-giam-doc-duyet-phan-cong.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TongGiamDocDuyetPhanCongComponent implements OnInit, OnChanges {
  @Input() sections: NoiDungSection[];
  @Output() sectionsChange = new EventEmitter<NoiDungSection[]>();

  constructor(private sharedDanhMucService: SharedDanhMucService, private messageService: MessageService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.syncFromAssignment();
    // this.ensureUniqueXuLyBan();
    this.loadBanChucNangOptions();
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('sections' in changes) {
      this.syncFromAssignment();
      if (Array.isArray(this.banChucNangOptions) && this.banChucNangOptions.length > 0) {
      }
      // this.ensureUniqueXuLyBan();
      this.cdr.markForCheck();
    }
  }



  private syncFromAssignment() {
    if (!Array.isArray(this.sections)) return;
    for (const sec of this.sections as any[]) {
      const assign = (sec as any).assignment;
      //lấy ra hiển thị ban chức năng
      let xuLy: number | null = (assign && assign.chucNangXuLy != null) ? assign.chucNangXuLy : null;
      if (xuLy == null && Array.isArray(sec.items)) {
        for (const it of sec.items as any[]) {
          if (it && it.banXuLyId != null) { xuLy = it.banXuLyId; break; }
        }
      }
      //lấy ra hiển thị ban phối hợp
      let phoi: number[] | null = null;
      if (assign && assign.chucNangPhoiHop !== undefined) {
        const ph = assign.chucNangPhoiHop;
        const arr = Array.isArray(ph) ? ph : (ph != null ? [ph] : []);
        phoi = arr.length ? Array.from(new Set(arr)) : null;
      } else if (Array.isArray(sec.items)) {
        const set = new Set<number>();
        for (const it of sec.items as any[]) {
          const ids = Array.isArray(it?.banPhoiHopIds) ? it.banPhoiHopIds : [];
          ids.forEach((id: number) => { if (id != null) set.add(id); });
        }
        phoi = set.size ? Array.from(set) : null;
      }
      sec.xuLyBan = xuLy;
      (sec as any).phoiHopBan = phoi;
    }
  }

  // options for dropdowns, load from API getListBanChucNang
  banChucNangOptions: { label: string; value: number | null }[] = [];

  private loadBanChucNangOptions(): void {
    this.sharedDanhMucService.getListBanChucNang()
      .subscribe({
        next: list => {
          const mapped = (list || []).map(d => ({ label: (d as any).displayName ?? '-', value: (d as any).id ?? null }));
          this.banChucNangOptions = mapped;
          // After options loaded, ensure selection from existing IDs (banXuLyId, banPhoiHopIds) is reflected and valid
          this.syncFromAssignment();
          // this.ensureUniqueXuLyBan();
          // this.reconcileSelectionWithOptions();
          this.cdr.markForCheck();
        },
        error: err => {
          console.error('loadBanChucNangOptions failed', err);
          this.banChucNangOptions = [];
          this.cdr.markForCheck();
        }
      });
  }

  // Options for "Ban chức năng phối hợp" filtered theo lựa chọn xử lý
  getPhoiHopOptions(section: NoiDungSection): { label: string; value: number | null }[] {
    const selectedXuLy = section?.xuLyBan ?? null;
    if (selectedXuLy == null) return this.banChucNangOptions;
    return (this.banChucNangOptions || []).filter(opt => opt.value !== selectedXuLy);
  }

  // Options cho "Ban xử lý" không cho phép trùng giữa các section
  getXuLyOptions(section: NoiDungSection): { label: string; value: number | null }[] {
    const usedByOthers = new Set<number>();
    (this.sections || []).forEach(sec => {
      if (!sec || sec === section) return;
      const id = sec.xuLyBan;
      if (id != null) usedByOthers.add(id);
    });
    return (this.banChucNangOptions || []).filter(opt => opt.value == null || !usedByOthers.has(opt.value));
  }

  // Khi đổi "Ban chức năng" xử lý, loại bỏ giá trị trùng khỏi danh sách phối hợp
  onXuLyBanChange(section: NoiDungSection): void {
    const selectedXuLy = section?.xuLyBan ?? null;
    let phoiHop = section?.phoiHopBan as (number[] | null | undefined);
    if (!Array.isArray(phoiHop)) {
      phoiHop = [];
    }
    if (selectedXuLy != null) {
      const next = phoiHop.filter(v => v !== selectedXuLy);
      section.phoiHopBan = next;
    } else {
      section.phoiHopBan = phoiHop;
    }
    // this.ensureUniqueXuLyBan();
    this.cdr.markForCheck();
  }


  getBanLabel(id: number | null | undefined): string {
  if (id == null) return '-';
  const opt = (this.banChucNangOptions || []).find(o => o.value === id);
  return opt?.label ?? String(id);
  }
  
  getBanLabels(ids: number[] | null | undefined): string[] {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  const map = new Map((this.banChucNangOptions || []).map(o => [o.value, o.label] as [number | null, string]));
  return ids
  .filter(v => v != null)
  .map(v => map.get(v as number) ?? String(v as number));
  }
  
  // Đảm bảo các ban xử lý không trùng nhau giữa các section; giữ lại lựa chọn đầu tiên, reset các bản trùng sau
  // private ensureUniqueXuLyBan(): void {
  //   if (!Array.isArray(this.sections)) return;
  //   const seen = new Set<number>();
  //   for (const sec of this.sections) {
  //     const id = sec?.xuLyBan ?? null;
  //     if (id == null) continue;
  //     if (seen.has(id)) {
  //       // Duplicate found; reset and toast
  //       const dupLabel = this.getBanLabel(id);
  //       sec.xuLyBan = null;
  //       this.messageService.add({
  //         key: 'global',
  //         severity: 'warn',
  //         summary: 'Thông báo',
  //         detail: `Ban xử lý "${dupLabel}" đã được chọn ở mục khác. Vui lòng chọn ban khác.`,
  //         life: 3000,
  //       });
  //     } else {
  //       seen.add(id);
  //     }
  //   }
  // }
  
  
  toggleSection(section: NoiDungSection) {
    section.collapsed = !section.collapsed;
    this.cdr.markForCheck();
  }

  toggleItem(item: NoiDungItem) {
    item.collapsed = !item.collapsed;
    this.cdr.markForCheck();
  }

  getGlobalIndex(sectionIndex: number, itemIndex: number): number {
    let index = 1;
    for (let i = 0; i < this.sections.length; i++) {
      if (i < sectionIndex) index += this.sections[i].items.length;
    }
    return index + itemIndex;
  }

  triggerFileInput(sIdx: number, iIdx: number) {
    const el = document.getElementById(`file_${sIdx}_${iIdx}`) as HTMLInputElement | null;
    el?.click();
  }

  onFileSelect(event: Event, sIdx: number, iIdx: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFiles = Array.from(input.files);
      this.sections[sIdx].items[iIdx].attachments.push(...newFiles);
      input.value = '';
      this.sectionsChange.emit(this.sections);
      this.cdr.markForCheck();
    }
  }

  removeFile(sIdx: number, iIdx: number, fileIndex: number) {
    this.sections[sIdx].items[iIdx].attachments.splice(fileIndex, 1);
    this.sectionsChange.emit(this.sections);
    this.cdr.markForCheck();
  }

  
}
