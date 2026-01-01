
import { DynamicTableAction, DynamicTableColumn, DynamicTableConfig } from '../../../../../shared/components/dynamic-table/dynamic-table.component';

// Columns configuration for JobPosting dynamic table
export const JobPostingColumns: DynamicTableColumn[] = [
  { field: 'title', header: 'title' },
  { field: 'benefits', header: 'Lương & Quyền lợi', minWidth: '220px' },
  { field: 'salaryRange', header: 'Yêu cầu công việc', minWidth: '220px' },
  { field: 'jobRequirements', header: 'Mô tả công việc', minWidth: '220px' },
  { field: 'location', header: 'Địa điểm', align: 'center', minWidth: '150px' },
];

// Row actions for JobPosting dynamic table
export function CreateJobPostingActions(): DynamicTableAction[] {
  return [
    { key: 'view', label: 'Xem', icon: 'pi pi-eye', severity: 'info', tooltip: 'Xem chi tiết',rounded:false, visible: row => true },
    { key: 'edit', label: 'Sửa', icon: 'pi pi-pencil', color:"#444CE7", tooltip: 'Sửa',rounded:false, visible: row => true  },
    { key: 'delete', label: 'Xóa', icon: 'pi pi-trash', severity: 'danger', tooltip: 'Xóa',rounded:false, visible: row => true  },
  ];
}

// Factory to create a new table config instance to avoid shared mutable state
export function createJobPostingTableConfig(): DynamicTableConfig {
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
