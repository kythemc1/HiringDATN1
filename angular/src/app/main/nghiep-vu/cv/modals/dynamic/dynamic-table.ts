
import { DynamicTableAction, DynamicTableColumn, DynamicTableConfig } from '../../../../../shared/components/dynamic-table/dynamic-table.component';

// Columns configuration for AgentThinkingLog dynamic table
export const CvColumns: DynamicTableColumn[] = [
  { field: 'fullName', header: 'Tên', minWidth: '220px' },
  { field: 'email', header: 'Email', minWidth: '220px' },
  { field: 'phoneNumber', header: 'Số điện thoại', minWidth: '220px' },
  { field: 'address', header: 'Địa chỉ', minWidth: '220px' },
  { field: 'gender', header: 'Giới tính', minWidth: '220px' },
  { field: 'dateOfBirth', header: 'Ngày sinh', minWidth: '220px' },
];

// Row actions for AgentThinkingLog dynamic table
export function CreateCvActions(): DynamicTableAction[] {
  return [
    { key: 'view', label: 'Xem', icon: 'pi pi-eye', severity: 'info', tooltip: 'Xem chi tiết',rounded:false, visible: row => true },
    // { key: 'edit', label: 'Sửa', icon: 'pi pi-pencil', color:"#444CE7", tooltip: 'Sửa',rounded:false, visible: row => true  },
    { key: 'delete', label: 'Xóa', icon: 'pi pi-trash', severity: 'danger', tooltip: 'Xóa',rounded:false, visible: row => true  },
  ];
}

// Factory to create a new table config instance to avoid shared mutable state
export function createCvTableConfig(): DynamicTableConfig {
  return {
    rows: 10,
    rowsPerPageOptions: [10, 20, 50],
    rowHover: true,
    // selectionMode: 'multiple',
    useExternalPaginator: true,
    showIndex: true,
    actionsHeader: 'Thao tác',
    totalLabel: 'Tổng cộng',
    globalFilterPlaceholder: 'Tìm kiếm tên',
  };
}
