import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { LoaiToChucService } from '@proxy/administration/danh-muc-chungs';

// Doanh nghiệp con (cấp 2)
export interface DoanhNghiepDto {
  Id: number;
  TenDoanhNghiep: string;
}

// Loại doanh nghiệp (cấp 1)
export interface LoaiDoanhNghiepDto {
  Id: number;
  TenLoai: string; // Tên của loại doanh nghiệp
  DoanhNghieps: DoanhNghiepDto[]; // Danh sách các doanh nghiệp con
}

@Component({
  standalone: false,
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.less'],
})
export class SideFilterComponent implements OnInit {
  nodes: TreeNode[] = [];
  filteredNodes: TreeNode[] = [];
  selectedNode: TreeNode | null = null;
  keyword: string = '';

  @Output() organizationSelected = new EventEmitter<number>();

  constructor(private loaiToChucService: LoaiToChucService) {}

  ngOnInit() {
    this.loadFromApi();
  }

  private loadFromApi() {
    this.loaiToChucService.getViewAll().subscribe({
      next: (res) => {
        const groups = (res || []).map(group => ({
          label: group.loaiToChucDto?.tenLoaiTochuc || '',
          expanded: false,
          children: (group.toChucDtos || []).map(child => ({
            label: child.tenToChuc,
            data: child
          }))
        }));
        this.nodes = groups;
        this.expandAndSelectDefault();
        this.updateFilteredNodes();
      },
      error: () => {
        this.nodes = [];
        this.filteredNodes = [];
      }
    });
  }

  /** Mở loại có dữ liệu đầu tiên và chọn node con đầu tiên */
  private expandAndSelectDefault() {
    const firstWithChildren = this.nodes.find((n) => n.children && n.children.length > 0);
    if (firstWithChildren) {
      firstWithChildren.expanded = true;
      this.selectedNode = firstWithChildren.children![0];
      const id = (this.selectedNode as any)?.data?.id;
      if (id != null) {
        this.organizationSelected.emit(id);
      }
    }
  }

  /** Khi click node con */
  onNodeClick(event: MouseEvent, node: TreeNode) {
    event.stopPropagation();
    // Node con => chọn và giữ highlight
    this.selectedNode = node;
    const id = (node as any)?.data?.id;
    if (id != null) {
      this.organizationSelected.emit(id);
    }
  }

  /** Toggle mở/đóng node cha */
  toggleNode(event: MouseEvent, node: TreeNode) {
    event.stopPropagation();
    node.expanded = !node.expanded;
  }

  /** Kiểm tra node có đang được chọn hay không (chỉ node con mới được highlight) */
  isNodeSelected(node: TreeNode): boolean {
    // Nếu node là cha: highlight nếu bất kỳ node con của nó đang được chọn
    if (node.children && node.children.length > 0) {
      if (!this.selectedNode) return false;
      return node.children.some(
        (c) => c === this.selectedNode || (c.label && this.selectedNode && c.label === this.selectedNode.label)
      );
    }

    // Node con: highlight khi bằng selectedNode
    return this.selectedNode === node;
  }

  /** Chặn unselect mặc định của PrimeNG Tree (giữ lại cho template cũ) */
  onTreeClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isNode = target.closest('.p-tree-node-content');

    if (!isNode) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
  }

  /** Cập nhật filter khi gõ tìm kiếm */
  onFilterChange() {
    this.updateFilteredNodes();
  }

  /** Tạo danh sách nodes theo từ khóa */
  private updateFilteredNodes() {
    const kw = (this.keyword || '').trim().toLowerCase();
    if (!kw) {
      this.filteredNodes = [...this.nodes];
      return;
    }

    const results: TreeNode[] = [];
    for (const parent of this.nodes) {
      const hasChildren = parent.children && parent.children.length > 0;
      const parentMatch = (parent.label || '').toLowerCase().includes(kw);
      const childMatches = hasChildren
        ? parent.children!.filter((c) => (c.label || '').toLowerCase().includes(kw))
        : [];

      if (parentMatch || childMatches.length > 0) {
        results.push({
          ...parent,
          children: parentMatch ? parent.children : childMatches,
          expanded: parentMatch ? parent.expanded : true,
        });
      }
    }

    this.filteredNodes = results;
  }
}
