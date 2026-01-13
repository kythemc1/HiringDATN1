
import { DynamicTableAction, DynamicTableColumn, DynamicTableConfig } from '../../../../../shared/components/dynamic-table/dynamic-table.component';

// Columns configuration for AiPromptTemplate dynamic table
export const AiPromptTemplateColumns: DynamicTableColumn[] = [
  { field: 'displayCode', header: 'Mã mẫu', minWidth: '160px' },
  { field: 'displayDescription', header: 'Mô tả', minWidth: '220px' },
  { field: 'modelConfigId', header: 'Cấu hình', minWidth: '180px' },
  { field: 'displayTemperature', header: 'Nhiệt độ', align: 'center', minWidth: '120px' },
];

// Row actions for AiPromptTemplate dynamic table
export function CreateAiPromptTemplateActions(): DynamicTableAction[] {
  return [
    { key: 'view', label: 'Xem', icon: 'pi pi-eye', severity: 'info', tooltip: 'Xem chi tiết',rounded:false, visible: row => true },
    { key: 'edit', label: 'Sửa', icon: 'pi pi-pencil', color:"#444CE7", tooltip: 'Sửa',rounded:false, visible: row => true  },
    { key: 'delete', label: 'Xóa', icon: 'pi pi-trash', severity: 'danger', tooltip: 'Xóa',rounded:false, visible: row => true  },
  ];
}

// Factory to create a new table config instance to avoid shared mutable state
export function createAiPromptTemplateTableConfig(): DynamicTableConfig {
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
