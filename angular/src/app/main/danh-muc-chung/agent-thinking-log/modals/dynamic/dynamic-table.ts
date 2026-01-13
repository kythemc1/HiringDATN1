
import { DynamicTableAction, DynamicTableColumn, DynamicTableConfig } from '../../../../../shared/components/dynamic-table/dynamic-table.component';

// Columns configuration for AgentThinkingLog dynamic table
export const AgentThinkingLogColumns: DynamicTableColumn[] = [
  { field: 'messageId', header: 'Message ID', minWidth: '150px' },
  { field: 'agentName', header: 'Agent', minWidth: '200px' },
  { field: 'stepName', header: 'Step' },
  { field: 'inputData', header: 'Input', minWidth: '250px' },
  { field: 'outputData', header: 'Output', minWidth: '250px' },
  { field: 'durationMs', header: 'Duration (ms)', align: 'right' },
];

// Row actions for AgentThinkingLog dynamic table
export function CreateAgentThinkingLogActions(): DynamicTableAction[] {
  return [
    { key: 'view', label: 'Xem', icon: 'pi pi-eye', severity: 'info', tooltip: 'Xem chi tiết', rounded: false, visible: row => true },
    { key: 'edit', label: 'Sửa', icon: 'pi pi-pencil', color: '#444CE7', tooltip: 'Sửa', rounded: false, visible: row => true },
    { key: 'delete', label: 'Xóa', icon: 'pi pi-trash', severity: 'danger', tooltip: 'Xóa', rounded: false, visible: row => true },
  ];
}

// Factory to create a new table config instance to avoid shared mutable state
export function createAgentThinkingLogTableConfig(): DynamicTableConfig {
  return {
    rows: 10,
    rowsPerPageOptions: [10, 20, 50],
    rowHover: true,
    // selectionMode: 'multiple',
    useExternalPaginator: true,
    showIndex: true,
    actionsHeader: 'Thao tác',
    totalLabel: 'Tổng cộng',
    globalFilterPlaceholder: 'Tìm kiếm theo message, agent, step',
  };
}
