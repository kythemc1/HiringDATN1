import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { SharedDanhMucService } from '@proxy/administration/shared/shared-danh-muc.service';
import { FileHelperService } from '../../file-utils/file-utils.service';

interface Attachment {
  name: string;
  url?: string;
}

interface PhoiHopItem {
  id: number;
  nguoiDung: string;
  vaiTro: 'Chuyên viên xử lý' | 'Chuyên viên phối hợp';
  ban: string;
  thoiGian: string;
  noiDungTieuChi: string;
  ghiChu?: string;
  tapTinDinhKem?: Attachment[];
}

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
  level: number;
  // group index for roman prefix (only for level 0 rows)
  sIdx?: number;
  children?: TnpcItem[];
}

interface NoiDungPhoiHopDto {
  baoCaoId: number;
  deMucId: number;
  tieuChiBaoCaoId: number;
  nguoiThucHienId: string;
  ngayThucHien: string;
  noiDung: string;
  toChucId: number;
  isLast: boolean;
}

@Component({
  standalone: false,
  selector: 'app-thong-tin-phoi-hop',
  templateUrl: './thong-tin-phoi-hop.component.html',
  styleUrls: ['./thong-tin-phoi-hop.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThongTinPhoiHopComponent implements OnInit, OnChanges {
  // Nhận đúng dữ liệu sections như app-tiep-nhan-phan-cong
  @Input() sectionsPC: any;
  @Input() noiDungPhoiHopDtosInput: NoiDungPhoiHopDto[] | null = null;

  // Danh sách tên chuyên viên phối hợp (lấy từ sectionsPC.chuyenVienPhoiHopXuLyDtos)
  chuyenVienPhoiHop: string[] = [];

  // Dữ liệu đã map để render, cùng cấu trúc với app-tiep-nhan-phan-cong
  tnpcItems: TnpcItem[] = [];
  // Dữ liệu phẳng cho dynamic-table khi không dùng tree mode
  flatData: Array<{
    isGroup: boolean;
    title: string;
    xuLy?: string;
    partner?: string;
    note?: string;
  }> = [];
  // Chỉ nhóm (section) cho bảng trên cùng
  flatGroups: Array<{
    title: string;
    partner?: string;
    chuyenVienPhoiHop?: string;
    sIdx?: number;
  }> = [];
  // Danh sách nội dung phối hợp lấy từ sectionsPC.noiDungPhoiHopDtos
  noiDungPhoiHopDtos: NoiDungPhoiHopDto[] = [];

  // options of ban chuc nang to map ids to labels
  banChucNangOptions: { label: string; value: number | null }[] = [];

  constructor(
    private sharedDanhMucService: SharedDanhMucService,
    private cdr: ChangeDetectorRef,
    private fileHelperService: FileHelperService // Dùng bên template nhé, đừng xoá
  ) {}

  ngOnInit(): void {
    this.loadBanChucNangOptions();
    if (Array.isArray(this.sectionsPC)) {
      this.tnpcItems = this.mapSectionsToTnpcItems(this.sectionsPC || []);
      this.flatData = this.buildFlatData(this.tnpcItems);
      this.flatGroups = this.buildFlatGroups(this.tnpcItems);
    } else {
      this.tnpcItems = [];
      this.flatData = [];
      this.flatGroups = [];
    }
    this.setPhoiHopListFromSections();
    this.setChuyenVienPhoiHopFromSections();
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('sectionsPC' in changes) {
      if (Array.isArray(this.sectionsPC)) {
        this.tnpcItems = this.mapSectionsToTnpcItems(this.sectionsPC || []);
        this.flatData = this.buildFlatData(this.tnpcItems);
        this.flatGroups = this.buildFlatGroups(this.tnpcItems);
      } else {
        this.tnpcItems = [];
        this.flatData = [];
        this.flatGroups = [];
      }
      this.setPhoiHopListFromSections();
      this.setChuyenVienPhoiHopFromSections();
      this.cdr.markForCheck();
    }
    if ('noiDungPhoiHopDtosInput' in changes) {
      this.setPhoiHopListFromSections();
      this.cdr.markForCheck();
    }
  }

  // Map đúng logic của app-tiep-nhan-phan-cong để đảm bảo nhất quán
  private mapSectionsToTnpcItems(sections: any[]): TnpcItem[] {
    const result: TnpcItem[] = [];
    (sections || []).forEach((section: any, sIdx: number) => {
      const groupId = section?.id != null ? String(section.id) : `grp-${sIdx + 1}`;
      const children: TnpcItem[] = [];
      const assignment = section?.assignment;

      // group xử lý label
      const groupXuLyId: number | null = assignment?.chucNangXuLy ?? null;
      const groupXuLy = this.getBanLabels(groupXuLyId != null ? [groupXuLyId] : null).join(', ');

      // derive phoi hop ids from assignment if available, else aggregate from items
      let sectionPhoiHopIds: number[] | null = null;
      if (assignment && assignment.chucNangPhoiHop !== undefined) {
        const ph = assignment.chucNangPhoiHop;
        const arr = Array.isArray(ph) ? ph : ph != null ? [ph] : [];
        sectionPhoiHopIds = arr.length ? Array.from(new Set(arr)) : null;
      } else if (Array.isArray(section?.items)) {
        const set = new Set<number>();
        for (const it of section.items as any[]) {
          const ids = Array.isArray(it?.banPhoiHopIds) ? it.banPhoiHopIds : [];
          ids.forEach((id: number) => {
            if (id != null) set.add(id);
          });
        }
        sectionPhoiHopIds = set.size ? Array.from(set) : null;
      }
      const groupPartner = this.getBanLabels(sectionPhoiHopIds).join(', ');

      result.push({
        id: groupId,
        title: section?.title ?? '-',
        groupPartner,
        groupXuLy,
        level: 0,
        sIdx: sIdx,
        children,
      });
    });
    return result;
  }

  private buildFlatData(
    nodes: TnpcItem[]
  ): Array<{ isGroup: boolean; title: string; xuLy?: string; partner?: string; note?: string }> {
    const out: Array<{
      isGroup: boolean;
      title: string;
      xuLy?: string;
      partner?: string;
      note?: string;
    }> = [];
    for (const grp of nodes || []) {
      out.push({ isGroup: true, title: grp.title, xuLy: grp.groupXuLy, partner: grp.groupPartner });
      const children = grp.children || [];
      for (const it of children) {
        out.push({
          isGroup: false,
          title: it.title,
          xuLy: it.xuLy,
          partner: it.partner,
          note: it.note,
        });
      }
    }
    return out;
  }

  private buildFlatGroups(
    nodes: TnpcItem[]
  ): Array<{ title: string; partner?: string; chuyenVienPhoiHop?: string; sIdx?: number }> {
    const out: Array<{
      title: string;
      partner?: string;
      chuyenVienPhoiHop?: string;
      sIdx?: number;
    }> = [];
    for (const grp of nodes || []) {
      out.push({
        title: grp.title,
        partner: grp.groupPartner,
        chuyenVienPhoiHop: this.chuyenVienPhoiHop?.join(', '),
        sIdx: grp.sIdx,
      });
    }
    return out;
  }

  private loadBanChucNangOptions(): void {
    this.sharedDanhMucService.getListBanChucNang().subscribe({
      next: list => {
        const mapped = (list || []).map(d => ({
          label: (d as any).displayName ?? '-',
          value: (d as any).id ?? null,
        }));
        this.banChucNangOptions = mapped;
        // re-map to update labels if sectionsPC is array
        if (Array.isArray(this.sectionsPC)) {
          this.tnpcItems = this.mapSectionsToTnpcItems(this.sectionsPC || []);
          this.flatData = this.buildFlatData(this.tnpcItems);
          this.flatGroups = this.buildFlatGroups(this.tnpcItems);
        }
        this.cdr.markForCheck();
      },
      error: _ => {
        this.banChucNangOptions = [];
      },
    });
  }

  public getBanLabels(ids: Array<number | string> | null | undefined): string[] {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    const map = new Map<string, string>(
      (this.banChucNangOptions || []).map(o => [String(o.value), o.label])
    );
    return ids
      .filter(v => v != null && v !== '')
      .map(v => map.get(String(v)) ?? '-')
      .filter(label => label && label !== '-');
  }

  private setPhoiHopListFromSections(): void {
    const fromInput = Array.isArray(this.noiDungPhoiHopDtosInput)
      ? this.noiDungPhoiHopDtosInput
      : null;
    const list =
      fromInput ??
      (Array.isArray(this.sectionsPC?.noiDungPhoiHopDtos)
        ? this.sectionsPC.noiDungPhoiHopDtos
        : []);
    this.noiDungPhoiHopDtos = [...list].sort(
      (a, b) => new Date(b.ngayThucHien).getTime() - new Date(a.ngayThucHien).getTime()
    );
  }

  // Lấy danh sách tên chuyên viên phối hợp từ sectionsPC.chuyenVienPhoiHopXuLyDtos và cập nh���t flatGroups
  private setChuyenVienPhoiHopFromSections(): void {
    const arr = Array.isArray(this.sectionsPC?.chuyenVienPhoiHopXuLyDtos)
      ? this.sectionsPC.chuyenVienPhoiHopXuLyDtos
      : [];
    this.chuyenVienPhoiHop = (arr || [])
      .map((x: any) => x?.hoTen)
      .filter((v: any) => typeof v === 'string' && v.trim().length > 0);

    // cập nhật lại flatGroups để hiển thị tên
    this.flatGroups = this.buildFlatGroups(this.tnpcItems);
  }

  trackByPhoiHop(_index: number, item: NoiDungPhoiHopDto): string {
    return (item?.ngayThucHien ?? '') + '|' + (item?.noiDung ?? '');
  }

  // trackBy helpers
  trackById(_index: number, item: PhoiHopItem): number {
    return item.id;
  }

  trackBySection(_index: number, row: { id?: number }): number {
    return row?.id ?? _index;
  }

  public getLabel(value: number | null | undefined): string {
    if (value == null) return '';
    const found = this.banChucNangOptions.find(o => o.value === value);
    return found?.label || '';
  }
}
