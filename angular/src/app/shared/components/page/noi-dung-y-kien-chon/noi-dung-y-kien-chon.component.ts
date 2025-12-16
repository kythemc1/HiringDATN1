import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

interface NoiDungItem {
  id: number;
  title: string;
  subTitle?: string;
  agree?: boolean | null; // true: dong y, false: khong dong y
  reason?: string;
  attachments: File[];
  collapsed?: boolean;
  tieuChiChaId?: number;
  tieuChiVersionId?: number;
  tieuChiChaVersionId?: number;
  isDeMuc?: boolean;
}

interface NoiDungSection {
  id: string;
  title: string; // e.g. I. VỀ CHIẾN LƯỢC, QUẢN TRỊ
  collapsed: boolean;
  tieuChiChaId?: number;
  tieuChiVersionId?: number;
  tieuChiChaVersionId?: number;
  items: NoiDungItem[];
}

@Component({
  selector: 'app-noi-dung-y-kien-chon',
  standalone: false,
  templateUrl: './noi-dung-y-kien-chon.component.html',
  styleUrl: './noi-dung-y-kien-chon.component.less',
})
export class NoiDungYKienChonComponent implements OnChanges {
  @Input() sections: NoiDungSection[];
  @Output() sectionsChange = new EventEmitter<NoiDungSection[]>();

  // Selected item ids
  @Input() selectedIds: number[] = [];
  @Output() selectedIdsChange = new EventEmitter<number[]>();
  parentMap = new Map<number, number>(); // con -> cha
  childrenMap = new Map<number, number[]>(); // cha -> danh sách con
  indexMap = new Map<number, string>();
  itemCounter = 0;
  rootsOrder: number[] = [];

  ngOnChanges() {
    if (this.sections) {
      this.buildParentChildMaps();
      this.buildTreeIndexes();
    }
  }

  buildParentChildMaps() {
    this.parentMap.clear();
    this.childrenMap.clear();

    for (const section of this.sections) {
      for (const item of section.items) {
        if (item.tieuChiChaId) {
          this.parentMap.set(item.id, item.tieuChiChaId);
          if (!this.childrenMap.has(item.tieuChiChaId)) {
            this.childrenMap.set(item.tieuChiChaId, []);
          }
          this.childrenMap.get(item.tieuChiChaId)!.push(item.id);
        }
      }
    }
  }

  buildTreeIndexes() {
    this.indexMap.clear();
    this.itemCounter = 0;

    // Collect all item IDs present in current sections for robust parent checks
    const allIds = new Set<number>();
    for (const section of this.sections || []) {
      for (const it of section.items) allIds.add(it.id);
    }

    // Build ordered list of root items (preserve the order items appear in sections).
    // Treat an item as a root when it has no parent OR its parent is not present in current data.
    this.rootsOrder = [];
    for (const section of this.sections) {
      for (const item of section.items) {
        const parent = this.parentMap.get(item.id);
        const isRoot = parent == null || !allIds.has(parent);
        if (isRoot) {
          this.rootsOrder.push(item.id);
        }
      }
    }

    // Prepopulate top-level indexes (roots). Other indexes will be computed on demand.
    this.itemCounter = 0;
    for (const rootId of this.rootsOrder) {
      this.itemCounter++;
      const prefix = this.itemCounter.toString();
      this.indexMap.set(rootId, prefix);
    }
  }

  private assignIndexRecursive(id: number, prefix: string) {
    // Keep for compatibility: assign prefix and recurse through children
    if (!this.indexMap.has(id)) {
      this.indexMap.set(id, prefix);
    }
    const children = this.childrenMap.get(id) || [];
    for (let i = 0; i < children.length; i++) {
      const childId = children[i];
      const childPrefix = `${prefix}.${i + 1}`;
      if (!this.indexMap.has(childId)) {
        this.indexMap.set(childId, childPrefix);
      }
      this.assignIndexRecursive(childId, childPrefix);
    }
  }

  /**
   * Compute index for any node on-demand by walking ancestors and calculating
   * sibling positions. Caches result in `indexMap`.
   */
  getIndex(id: number): string {
    if (this.indexMap.has(id)) return this.indexMap.get(id)!;

    // Build ancestor chain from root -> ... -> id
    const chain: number[] = [];
    let cur: number | undefined = id;
    // Stop climbing when parent is missing from current sections (so the visible node is treated as root)
    const allIds = new Set<number>();
    for (const section of this.sections || []) for (const it of section.items) allIds.add(it.id);

    while (cur !== undefined && cur !== null) {
      chain.push(cur);
      const parent = this.parentMap.get(cur);
      if (parent == null || !allIds.has(parent)) break;
      cur = parent;
    }
    chain.reverse(); // now root .. id

    const parts: string[] = [];
    for (let level = 0; level < chain.length; level++) {
      const nodeId = chain[level];
      if (level === 0) {
        // root level: position in rootsOrder (1-based)
        let pos = this.rootsOrder.indexOf(nodeId);
        if (pos < 0) {
          // rootsOrder may not be populated or nodeId not present; rebuild local roots order
          const localRoots: number[] = [];
          for (const section of this.sections || []) {
            for (const it of section.items) {
              if (!this.parentMap.has(it.id)) localRoots.push(it.id);
            }
          }
          pos = localRoots.indexOf(nodeId);
        }
        const num = pos >= 0 ? pos + 1 : 1; // default to 1 if still not found
        parts.push(num.toString());
      } else {
        const parentId = chain[level - 1];
        const siblings = this.childrenMap.get(parentId) || [];
        const pos = siblings.indexOf(nodeId);
        const num = pos >= 0 ? pos + 1 : 0;
        parts.push(num.toString());
      }
    }

    const result = parts.join('.');
    this.indexMap.set(id, result);
    return result;
  }

  toggleSection(section: NoiDungSection) {
    section.collapsed = !section.collapsed;
  }

  toggleItem(item: NoiDungItem) {
    item.collapsed = !item.collapsed;
  }

  getGlobalIndex(sectionIndex: number, itemIndex: number): number {
    let index = 1;
    for (let i = 0; i < this.sections.length; i++) {
      if (i < sectionIndex) index += this.sections[i].items.length;
    }
    return index + itemIndex;
  }

  isChecked(id: number): boolean {
    return this.selectedIds?.includes(id);
  }

  toggleSelected(id: number, checked: boolean) {
    const set = new Set<number>(this.selectedIds || []);

    if (checked) {
      // Chọn node hiện tại
      set.add(id);

      // Chọn tất cả con (đệ quy)
      this.selectAllChildren(id, set);

      // Chọn tất cả cha (đệ quy)
      this.selectAllParents(id, set);
    } else {
      // Bỏ chọn node hiện tại
      set.delete(id);

      // Bỏ chọn tất cả con
      this.deselectAllChildren(id, set);

      // Nếu tất cả con của cha đều bị bỏ -> bỏ chọn cha
      this.updateParentState(id, set);
    }

    this.selectedIds = Array.from(set);
    this.selectedIdsChange.emit(this.selectedIds);
  }

  private selectAllChildren(id: number, set: Set<number>) {
    const children = this.childrenMap.get(id);
    if (!children) return;
    for (const childId of children) {
      set.add(childId);
      this.selectAllChildren(childId, set);
    }
  }

  private deselectAllChildren(id: number, set: Set<number>) {
    const children = this.childrenMap.get(id);
    if (!children) return;
    for (const childId of children) {
      set.delete(childId);
      this.deselectAllChildren(childId, set);
    }
  }

  private selectAllParents(id: number, set: Set<number>) {
    const parentId = this.parentMap.get(id);
    if (!parentId) return;
    set.add(parentId);
    this.selectAllParents(parentId, set);
  }

  private updateParentState(id: number, set: Set<number>) {
    const parentId = this.parentMap.get(id);
    if (!parentId) return;

    const siblings = this.childrenMap.get(parentId) || [];
    const anySelected = siblings.some(childId => set.has(childId));

    if (!anySelected) {
      set.delete(parentId);
      this.updateParentState(parentId, set);
    }
  }
}
