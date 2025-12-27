
import { DynamicTableAction, DynamicTableColumn, DynamicTableConfig } from '../../../../../shared/components/dynamic-table/dynamic-table.component';

// Columns configuration for CandidateProfile dynamic table
export const CandidateProfileColumns: DynamicTableColumn[] = [
  { field: 'displayProvider', header: 'Nhà cung cấp' },
  { field: 'displayModel', header: 'Tên mô hình', minWidth: '220px' },
  { field: 'displayDescription', header: 'Mô tả', minWidth: '220px' },
  { field: 'displayStatus', header: 'Trạng thái', align: 'center', minWidth: '150px' },
];

// Row actions for CandidateProfile dynamic table
export function CreateCandidateProfileActions(): DynamicTableAction[] {
  return [
    { key: 'view', label: 'Xem', icon: 'pi pi-eye', severity: 'info', tooltip: 'Xem chi tiết',rounded:false, visible: row => true },
    { key: 'edit', label: 'Sửa', icon: 'pi pi-pencil', color:"#444CE7", tooltip: 'Sửa',rounded:false, visible: row => true  },
    { key: 'delete', label: 'Xóa', icon: 'pi pi-trash', severity: 'danger', tooltip: 'Xóa',rounded:false, visible: row => true  },
  ];
}

// Factory to create a new table config instance to avoid shared mutable state
export function createCandidateProfileTableConfig(): DynamicTableConfig {
  return {
    rows: 10,
    rowsPerPageOptions: [10, 20, 50],
    rowHover: true,
    // selectionMode: 'multiple',
    useExternalPaginator: true,
    showIndex: true,
    actionsHeader: 'Thao tác',
    totalLabel: 'Tổng cộng',
    globalFilterPlaceholder: 'Tìm kiếm tên, mã',
  };
}
