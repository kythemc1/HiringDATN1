import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  OnChanges,
  SimpleChanges,
  Injector,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
// import { GlobalListManager } from '../../utils/header-single-page';
// import { TrangThaiBaoCaoUtilsConsts, TrangThaiCongViecUtilsConsts, calcTableHeight } from '../../utils';
export interface DynamicTableColumn {
  field: string;
  sortField?: string;
  header: string;
  width?: string;
  minWidth?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'date' | 'number' | 'badge' | 'tag' | 'boolean';
  dateFormat?: string;
  templateKey?: string;
  clampLines?: number; // limit text lines and auto show tooltip when set
}

export interface DynamicTableAction {
  key?: string; // identifier for action (e.g., 'edit', 'delete')
  icon?: string;
  label?: string;
  iconOnly?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  text?: boolean; // text style
  severity?:
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'help'
  | 'danger'
  | 'contrast'
  | null;
  tooltip?: string;
  // Custom styling (optional)
  styleClass?: string; // custom CSS class(es)
  style?: { [klass: string]: any }; // inline styles
  color?: string; // custom background/border color (hex/RGB/HSL)
  textColor?: string; // custom text color override
  borderColor?: string; // custom border color override
  // Flexible visibility control
  visible?: (row: any) => boolean; // custom function to determine visibility
}

export interface DynamicTableConfig {
  // table
  paginator?: boolean; //p-table paginator
  rows?: number;
  rowsPerPageOptions?: number[];
  showCurrentPageReport?: boolean;
  currentPageReportTemplate?: string;
  globalFilter?: boolean; // show filter
  globalFilterPlaceholder?: string; // placeholder for global filter
  showFilterButton?: boolean; // show a filter button next to search
  filterIcon?: string; // icon
  rowHover?: boolean;
  scrollHeight?: string;
  tableStyle?: { [klass: string]: any } | string | null;

  // selection
  selectionMode?: 'single' | 'multiple' | null; // enable selection column

  // index column
  showIndex?: boolean; // show row index column
  indexHeader?: string; // (default '#')

  // actions column
  actionsHeader?: string; // (default 'Hành động')

  // paginator summary
  showTotal?: boolean; // show total
  totalLabel?: string; //  (default 'Tổng cộng')

  // layout
  useExternalPaginator?: boolean;
}

@Component({
  selector: 'vnx-dynamic-table',
  standalone: false,
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.less']
})
export class DynamicTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: DynamicTableColumn[] = [];
  @Input() actions: DynamicTableAction[] = [];
  @Input() config: DynamicTableConfig = {
    paginator: true,
    rows: 10,
    rowsPerPageOptions: [10, 20, 50],
    showCurrentPageReport: true,
    globalFilter: false,
    rowHover: true,
    selectionMode: null,
    showIndex: true,
    actionsHeader: 'Hành động',
    showTotal: true,
    useExternalPaginator: true,
  };
  @Input() cellTemplates: { [key: string]: TemplateRef<any> } = {};
  @Input() loading = false;
  @Input() lazy = false;
  @Input() totalRecords = 0;
  @Input() selection: any[] | any = null;

  // Auto-breadcrumb when clicking common actions (edit/view)
  @Input() autoBreadcrumbActions: boolean = false;
  @Input() breadcrumbEntity?: string;
  @Input() breadcrumbMap?: { [key: string]: string };

  // Tree mode support
  @Input() isTree = false; // bật/tắt chế độ tree.
  @Input() childrenField: string = 'children'; // tên trường con (mặc định 'children').
  @Input() treeIdField?: string; // trường id duy nhất để giữ trạng thái expand
  @Input() treeExpandAll: boolean = false; // mở rộng tất cả các node khi ở chế độ tree
  @Input() treeDisableToggle: boolean = false; // vô hiệu hóa khả năng thu gọn/mở rộng bằng nút toggle

  //truyền giá trị cần gộp
  @Input() groupByField?: string; // ví dụ: 'maSo', 'ten', ...;
  @Input() groupSpanColumns?: string[]; // danh sách cột cần gộp;

  // Internal flattened data
  displayRows: any[] = [];
  private expandedMap: Record<string, boolean> = {}; //map trạng thái expand theo nodeId
  private rowGroupSpanMeta: Record<number, number> = {}; // startRowIndex -> size
  tableScrollHeight = 'calc(100vh - 250px)';

  // Standardized top search & filter controls
  @Input() searchKeyword = '';
  @Input() showAdvancedFilter = false; // parent can control visibility
  @Input() showFilter = true;
  @Input() showToggleFilter = true;
  @Input() filterTemplate?: TemplateRef<any>; // advanced filter template like chuc-vu form
  @Input() rightHeaderFilterTemplate?: TemplateRef<any>; // right advanced filter template like chuc-vu form

  // Outputs for standardized interactions
  @Output() lazyLoad = new EventEmitter<LazyLoadEvent>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<{ action: DynamicTableAction; row: any }>();
  @Output() selectionChange = new EventEmitter<any[] | any>();
  @Output() filterClick = new EventEmitter<void>();
  @Output() toggleFilterChange = new EventEmitter<boolean>();
  @Output() searchInputChange = new EventEmitter<string>();
  @Output() searchSubmit = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<{ page: number; rows: number }>();
  @Output() rowsPerPageChange = new EventEmitter<number>();

  pageIndex = 0; // external paginator current page index

  constructor (
    injector: Injector,
  ) {
    this.updateTableHeight();
  }

  // Return true if any row is selectable. Uses row.isSelectable !== false convention.
  anyRowSelectable(): boolean {
    const rows = this.isTree ? this.displayRows : this.data || [];
    try {
      return Array.isArray(rows) && rows.some(r => r?.isSelectable !== false);
    } catch {
      return true;
    }
  }

  get globalFilterFields(): string[] {
    return (this.columns || []).map(c => c.field);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['isTree']) {
      if (this.isTree) {
        this.buildDisplayRows();
      } else {
        this.displayRows = this.data || [];
      }
    }

    // build grouping meta when data or groupByField changes and not in tree mode
    if (!this.isTree && (changes['data'] || changes['groupByField'])) {
      this.buildRowGroupMeta();
    }
  }

  get pageRowsOptions(): number[] {
    return this.config?.rowsPerPageOptions || [10, 20, 50];
  }

  // Row grouping helpers
  private buildRowGroupMeta(): void {
    this.rowGroupSpanMeta = {};
    if (!this.groupByField) return;
    const rows = this.isTree ? this.displayRows || [] : this.data || [];
    if (!Array.isArray(rows) || rows.length === 0) return;

    let currentGroupStart: number | null = null;
    let lastVal: any = null;

    const isEmpty = (v: any): boolean => v == null || (typeof v === 'string' && v.trim() === '');

    for (let i = 0; i < rows.length; i++) {
      const val = rows[i]?.[this.groupByField!];
      const hasVal = !isEmpty(val);

      if (!hasVal) {
        // finish current group if any
        if (currentGroupStart != null) {
          this.rowGroupSpanMeta[currentGroupStart] = i - currentGroupStart;
          currentGroupStart = null;
          lastVal = null;
        }
        // non-grouped row: span 1
        this.rowGroupSpanMeta[i] = 1;
        continue;
      }

      if (currentGroupStart == null) {
        // start a new group with a valid value
        currentGroupStart = i;
        lastVal = val;
        continue;
      }

      // we are inside a group
      if (val !== lastVal) {
        // close previous group and start a new one
        this.rowGroupSpanMeta[currentGroupStart] = i - currentGroupStart;
        currentGroupStart = i;
        lastVal = val;
      }
    }

    // close final group if any
    if (currentGroupStart != null) {
      this.rowGroupSpanMeta[currentGroupStart] = rows.length - currentGroupStart;
    }
  }

  isGroupStart(rowIndex: number): boolean {
    if (!this.groupByField) return true;
    return this.rowGroupSpanMeta[rowIndex] != null;
  }

  getRowSpan(rowIndex: number): number {
    if (!this.groupByField) return 1;
    return this.rowGroupSpanMeta[rowIndex] || 1;
  }

  isGroupSpannedColumn(field: string): boolean {
    if (!this.groupByField) return false;
    const cols =
      Array.isArray(this.groupSpanColumns) && this.groupSpanColumns.length > 0
        ? this.groupSpanColumns
        : [this.groupByField];
    return cols.includes(field);
  }

  // Action động theo số action có
  getActionsColWidth(): number | null {
    if (!this.data || !this.actions) return null;

    let maxCount = 0;

    for (const row of this.data) {
      const count = this.actions.filter(a => {
        if (typeof a.visible === 'function') {
          return a.visible(row);
        }
        return a.visible !== false;
      }).length;

      if (count > maxCount) maxCount = count;
    }

    if (maxCount === 0) return null;

    const baseButton = 40; // width 1 button
    const gap = 8; // khoảng cách giữa các button
    const padding = 16; // padding left + right

    return maxCount * baseButton + (maxCount - 1) * gap + padding;
  }

  // Backward compatible global filter (inside table) - not used in standardized layout
  onGlobalFilter(event: Event, dt: any) {
    const value = (event.target as HTMLInputElement)?.value ?? '';
    dt.filterGlobal(value, 'contains');
  }

  onActionClick(event: MouseEvent, action: DynamicTableAction, row: any) {
    event.stopPropagation();

    // Auto push breadcrumb for common actions if enabled
    if (this.autoBreadcrumbActions) {
      const title = this.getAutoBreadcrumbTitle(action?.key);
      if (title) {
        try {
          // GlobalListManager.add(title);
        } catch { }
      }
    }

    this.actionClick.emit({ action, row });
  }

  onFilterClick(event: MouseEvent) {
    event.stopPropagation();
    this.filterClick.emit();
    this.toggleAdvancedFilter();
  }

  toggleAdvancedFilter(): void {
    this.showAdvancedFilter = !this.showAdvancedFilter;
    this.toggleFilterChange.emit(this.showAdvancedFilter);
    this.updateTableHeight();
  }

  updateTableHeight(): void {
    // this.tableScrollHeight = calcTableHeight(66, this.showAdvancedFilter);
  }

  onSearchInputChanged(event: Event) {
    const value = (event.target as HTMLInputElement)?.value ?? '';
    this.searchInputChange.emit(value);
  }

  onSearchEnter() {
    this.searchSubmit.emit();
  }

  onExternalPageChange(event: { page: number; rows: number; first?: number }) {
    this.pageIndex = event.page ?? 0;
    this.pageChange.emit({ page: this.pageIndex, rows: event.rows });

    if (this.lazy) {
      const first = (event.page ?? 0) * (event.rows ?? this.config?.rows ?? 10);
      this.lazyLoad.emit({ first, rows: event.rows });
    }
  }

  onExternalRowsChange(newRows: number) {
    this.config.rows = newRows;
    this.pageIndex = 0;
    this.rowsPerPageChange.emit(newRows);

    if (this.lazy) {
      this.lazyLoad.emit({ first: 0, rows: newRows });
    }
  }

  // Tree helpers
  onToggleExpand(event: MouseEvent, row: any) {
    event.stopPropagation();
    if (this.treeDisableToggle || this.treeExpandAll) return; // không cho toggle khi bị khóa hoặc khi luôn mở
    if (!row) return;
    const id = row.__nodeId as string | undefined;
    if (!id) return;
    const next = !this.expandedMap[id];
    this.expandedMap[id] = next;
    row.__expanded = next;
    this.buildDisplayRows();
  }

  private buildDisplayRows(): void {
    this.displayRows = [];
    const nodes = Array.isArray(this.data) ? this.data : [];
    this.walkNodes(nodes, 0, '');
  }

  private walkNodes(nodes: any[], level: number, path: string) {
    if (!Array.isArray(nodes)) return;
    nodes.forEach((node, index) => {
      const idPath = path ? `${path}.${index}` : `${index}`;
      const nodeId = this.getNodeId(node, idPath);
      const children = node?.[this.childrenField] as any[] | undefined;
      const hasChildren = Array.isArray(children) && children.length > 0;

      // attach
      try {
        node.__level = level;
        node.__nodeId = nodeId;
        node.__hasChildren = hasChildren;
        node.__expanded = this.treeExpandAll ? true : (this.expandedMap[nodeId] ?? false);
      } catch {
        // ignore
      }

      this.displayRows.push(node);

      if (hasChildren && node.__expanded) {
        this.walkNodes(children!, level + 1, nodeId);
      }
    });
  }

  private getNodeId(node: any, fallbackPath: string): string {
    if (this.treeIdField && node && node[this.treeIdField] != null) {
      return String(node[this.treeIdField]);
    }
    return fallbackPath;
  }

  showAction(act: DynamicTableAction, row: any): boolean {
    // Priority 1: If action has custom visibleWhen function, use it
    if (act.visible && typeof act.visible === 'function') {
      try {
        return act.visible(row);
      } catch (error) {
        console.error('Error executing visibleWhen/visible for action:', act.key, error);
        return false;
      }
    }

    // Priority 2: Fallback to default logic for backward compatibility
    switch (act.key) {
      // system-user
      // case 'activate':
      //   return !row.isActive;
      // case 'inactivate':
      //   return row.isActive;
      // system-user-end

      //cong-viec-end
      // version/actions: show edit only for draft (SoanThao === 3), show clone otherwise
      case 'edit':
        if (row && row.trangThaiQuyTrinh != null) {
          return row.trangThaiQuyTrinh === 3; // chỉ hiện edit khi trạng thái = 3 (Soạn thảo)
        }
      case 'clone':
        if (row && row.trangThaiQuyTrinh != null) {
          return row.trangThaiQuyTrinh !== 3; // chỉ hiện clone khi trạng thái khác 3 (không phải Soạn thảo)
        }
        return true;
      default:
        return true; // luôn hiển thị các nút khác
    }
  }

  // Compute inline styles for action buttons when using custom colors
  getActionStyles(act: DynamicTableAction): { [key: string]: any } {
    const st: { [key: string]: any } = { ...(act?.style || {}) };
    const color = act?.color;
    if (color) {
      const outlined = act?.outlined ?? false;
      const borderColor = act?.borderColor || color;
      const textColor = act?.textColor || (outlined ? color : '#fff');
      st['background-color'] = outlined ? 'transparent' : color;
      st['border-color'] = borderColor;
      st['color'] = textColor;
    }
    return st;
  }

  // Returns text to show in tooltip for truncated cell content
  getTooltipText(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    return String(value);
  }

  private getAutoBreadcrumbTitle(key?: string): string | null {
    if (!key) return null;
    if (this.breadcrumbMap && this.breadcrumbMap[key]) {
      return this.breadcrumbMap[key];
    }
    const entity = (this.breadcrumbEntity || '').trim();
    const suffix = entity ? ` ${entity}` : '';
    switch (key) {
      case 'edit':
        return `Chỉnh sửa${suffix}`;
      case 'view':
        return `Chi tiết${suffix}`;
      case 'approve':
        return `Duyệt${suffix}`
      default:
        return null;
    }
  }

  get currentDisplayData(): any[] {
    return this.isTree ? this.displayRows : this.data || [];
  }

  onRowHover(currentRow: any, isEntering: boolean): void {
    if (!this.groupByField) {
      currentRow.__isHovered = isEntering;
      return;
    }

    const rows = this.currentDisplayData;

    const groupValue = currentRow[this.groupByField];

    if (groupValue == null || (typeof groupValue === 'string' && groupValue.trim() === '')) {
      currentRow.__isHovered = isEntering;
      return;
    }

    rows.forEach(row => {
      if (row[this.groupByField!] === groupValue) {
        row.__isHovered = isEntering;
      }
    });
  }
}
