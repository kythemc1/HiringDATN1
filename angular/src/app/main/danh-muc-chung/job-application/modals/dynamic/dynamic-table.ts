
import { DynamicTableAction, DynamicTableColumn, DynamicTableConfig } from '../../../../../shared/components/dynamic-table/dynamic-table.component';

// Columns configuration for JobApplication dynamic table
export const JobApplicationColumns: DynamicTableColumn[] = [
  { field: 'displayJobId', header: 'ID công việc', minWidth: '140px' },
  { field: 'displayCandidateProfileId', header: 'ID ứng viên', minWidth: '140px' },
  { field: 'displayCoverLetter', header: 'Thư xin việc', minWidth: '240px' },
  { field: 'displayStatus', header: 'Trạng thái', align: 'center', minWidth: '140px' },
  { field: 'displayAiMatchingScore', header: 'Điểm AI', align: 'center', minWidth: '120px' },
];

// Row actions for JobApplication dynamic table
export function CreateJobApplicationActions(): DynamicTableAction[] {
  return [
    { key: 'view', label: 'Xem', icon: 'pi pi-eye', severity: 'info', tooltip: 'Xem chi tiết',rounded:false, visible: row => true },
    { key: 'edit', label: 'Sửa', icon: 'pi pi-pencil', color:"#444CE7", tooltip: 'Sửa',rounded:false, visible: row => true  },
    { key: 'delete', label: 'Xóa', icon: 'pi pi-trash', severity: 'danger', tooltip: 'Xóa',rounded:false, visible: row => true  },
  ];
}

// Factory to create a new table config instance to avoid shared mutable state
export function createJobApplicationTableConfig(): DynamicTableConfig {
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
