import { Component, computed, signal, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { SharedDanhMucService } from '@proxy/administration/shared/shared-danh-muc.service';

export interface TnpcItem {
  id: string;
  title: string; 
  summary?: string; 
  note?: string; 
  partner?: string; 
  // tên ban phối hợp tại group (nếu có)
  groupPartner?: string;
  // tên ban xử lý tại group (nếu có)
  groupXuLy?: string;
  // tên ban xử lý tại item (nếu có)
  xuLy?: string;
  // Chuyên viên xử lý 
  chuyenVien?: string;
  // Tên ban xử lý 
  ban?: string;
  // danh sách file đính kèm (nếu có)
  files?: { name: string; url?: string }[];
  level: number; 
  // group index for roman prefix (only for level 0 rows)
  sIdx?: number;
  children?: TnpcItem[];
}

@Component({
  standalone: false,
  selector: 'app-tiep-nhan-phan-cong',
  templateUrl: './tiep-nhan-phan-cong.component.html',
  styleUrls: ['./tiep-nhan-phan-cong.component.less'],
})
export class TiepNhanPhanCongComponent implements OnInit, OnChanges {
  @Input() sections: any[] = [];
  @Input() isChuyenVienXuLy: boolean | null = null;
  dataSig = signal<TnpcItem[]>([]);
  // track note open state per item id
  noteOpen = signal<Record<string, boolean>>({});

  // options of ban chuc nang to map ids to labels
  banChucNangOptions: { label: string; value: number | null }[] = [];

  constructor(private sharedDanhMucService: SharedDanhMucService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBanChucNangOptions();
    this.dataSig.set(this.mapSectionsToTnpcItems(this.sections || []));
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('sections' in changes) {
      this.dataSig.set(this.mapSectionsToTnpcItems(this.sections || []));
      this.cdr.markForCheck();
    }
  }

  private mapSectionsToTnpcItems(sections: any[]): TnpcItem[] {
    // Normalize sections and build rows in 3 clear steps: normalize -> map group -> map items
    const normSections = (sections || []).map((raw: any) => this.normalizeSection(raw));
    return normSections.map((sec, sIdx) => this.buildGroupRow(sec, sIdx));
  }

  // Chuẩn hoá dữ liệu 
  private normalizeSection(section: any): {
    id: string;
    title: string;
    banXuLyId: number | null;
    banXuLyDto?: any;
    banPhoiHopIds: number[];
    chuyenVienXuLyDto?: any;
    items: any[];
  } {
    const src = section?.assignment ?? section ?? {};
    const id = section?.id != null ? String(section.id) : this.cryptoRandom(`grp-`);
    const title = section?.title ?? section?.tenTieuChi ?? '-';

    const banXuLyId = src?.chucNangXuLy ?? src?.banXuLyId ?? null;
    const banXuLyDto = src?.banXuLyDto;
    const chuyenVienXuLyDto = src?.chuyenVienXuLyDto;

    const ph = src?.chucNangPhoiHop ?? src?.banPhoiHopIds;
    const banPhoiHopIds = (Array.isArray(ph) ? ph : (ph != null ? [ph] : [])).filter((x: any) => x != null);

    const items = Array.isArray(section?.items) ? section.items : (Array.isArray(section?.tieuChiCons) ? section.tieuChiCons : []);

    return { id, title, banXuLyId, banXuLyDto, banPhoiHopIds, chuyenVienXuLyDto, items };
  }

  // Sinh row 
  private buildGroupRow(sec: ReturnType<typeof this.normalizeSection>, sIdx: number): TnpcItem {
    const groupXuLy = this.getBanLabels(sec.banXuLyId != null ? [sec.banXuLyId] : null).join(', ');
    const groupPartner = this.getBanLabels(this.uniqueNumbers(sec.banPhoiHopIds)).join(', ');

    // Lấy Ban và Chuyên viên hiển thị ở cấp nhóm (id cha)
    const banFromDto = sec?.banXuLyDto?.tenToChuc as string | undefined;
    const ban = banFromDto || groupXuLy || undefined;
    const chuyenVien = (sec?.chuyenVienXuLyDto?.hoTen as string | undefined) || undefined;

    const children = this.mapItemsToRows(sec);

    return {
      id: sec.id,
      title: sec.title,
      groupPartner,
      groupXuLy,
      // Thông tin xử lý hiển thị ở template cấp nhóm
      ban,
      chuyenVien,
      level: 0,
      sIdx,
      children,
    };
  }

  //  Map các item con về TnpcItem
  private mapItemsToRows(sec: ReturnType<typeof this.normalizeSection>): TnpcItem[] {
    const out: TnpcItem[] = [];

    for (let i = 0; i < (sec.items?.length ?? 0); i++) {
      const it = sec.items[i] || {};

      // Phần hiển thị agree
      const agree = it.agree ?? it.isDongY;
      const agreeSuffix = (agree === null || agree === undefined) ? '' : (agree ? ' - Đồng ý' : ' - Không đồng ý');

      // Ban phối hợp
      const itemPartnerIds = Array.isArray(it?.banPhoiHopIds) ? it.banPhoiHopIds : [];
      const partner = this.getBanLabels((sec.banPhoiHopIds?.length ? sec.banPhoiHopIds : itemPartnerIds)).join(', ');

      // Ban xử lý của item theo id -> label
      const xuLyItemId: number | null = (it as any)?.banXuLyId ?? null;
      const xuLy = this.getBanLabels(xuLyItemId != null ? [xuLyItemId] : null).join(', ');

      // ID, files
      const childId = it.id != null ? String(it.id) : this.cryptoRandom(`${sec.id}-itm-`);
      const files = Array.isArray((it as any)?.attachments)
        ? ((it as any).attachments as any[]).map(f => ({
            name: f?.tenFile || f?.fileName || f?.name || '-',
            url: f?.duongDanFile || f?.fileUrl || f?.url || undefined,
          }))
        : [];

      // Chuyên viên và Ban từ DTO 
      const chuyenVien = it?.chuyenVienXuLyDto?.hoTen
        ?? sec?.chuyenVienXuLyDto?.hoTen
        ?? undefined;

      const ban = it?.banXuLyDto?.tenToChuc
        ?? sec?.banXuLyDto?.tenToChuc
        ?? (xuLy || undefined);

      const row: TnpcItem = {
        id: childId,
        title: `${i + 1}. ${it.title ?? it.tenTieuChi ?? '-'}` + agreeSuffix,
        partner,
        xuLy,
        chuyenVien,
        ban,
        files,
        level: 1,
      };

      // Mô tả con
      const desc = (it.summary ?? it.moTa ?? '').toString().trim();
      if (desc) {
        row.children = [
          { id: `${childId}-desc`, title: desc, level: 2 },
        ];
      }

      out.push(row);
    }

    return out;
  }

  // Helpers nhỏ gọn, dễ test
  private getBanLabels(ids: Array<number | string> | null | undefined): string[] {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    const map = new Map<string, string>((this.banChucNangOptions || []).map(o => [String(o.value), o.label]));
    return ids
      .filter(v => v != null && v !== '')
      .map(v => map.get(String(v)) ?? '-')
      .filter(label => label && label !== '-');
  }

  // Loại trùng và chuẩn hoá mảng số
  private uniqueNumbers(ids: any[] | null | undefined): number[] {
    if (!Array.isArray(ids)) return [];
    const set = new Set<number>();
    for (const v of ids) {
      const n = typeof v === 'string' ? Number(v) : v;
      if (typeof n === 'number' && !Number.isNaN(n)) set.add(n);
    }
    return Array.from(set);
  }

  // Tạo id ngẫu nhiên ngắn gọn để tránh trùng
  private cryptoRandom(prefix: string): string {
    try {
      const arr = new Uint32Array(2);
      // @ts-ignore
      (crypto || (window as any).crypto).getRandomValues(arr);
      return `${prefix}${arr[0].toString(36)}${arr[1].toString(36)}`;
    } catch {
      return `${prefix}${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
    }
  }

  private loadBanChucNangOptions(): void {
    this.sharedDanhMucService.getListBanChucNang()
      .subscribe({
        next: list => {
          const mapped = (list || []).map(d => ({ label: (d as any).displayName ?? '-', value: (d as any).id ?? null }));
          this.banChucNangOptions = mapped;
          // re-map to update labels
          this.dataSig.set(this.mapSectionsToTnpcItems(this.sections || []));
          this.cdr.markForCheck();
        },
        error: _ => {
          this.banChucNangOptions = [];
        }
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
}
