import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface TienTrinhStep {
  id: number;
  title: string;
  status: 'done' | 'active' | 'pending';
  description?: string;
}

@Component({
  standalone:false,
  selector: 'app-tien-trinh-thuc-hien',
  templateUrl: './tien-trinh-thuc-hien.component.html',
  styleUrls: ['./tien-trinh-thuc-hien.component.less']
})
export class TienTrinhThucHienComponent implements OnChanges {
  @Input() steps: TienTrinhStep[] = [
    { id: 1, title: 'Người đại diện lập báo cáo', status: 'done' },
    { id: 2, title: 'Văn thư tiếp nhận', status: 'done' },
    { id: 3, title: 'Ban chủ trì phân công', status: 'done' },
    { id: 4, title: 'Lãnh đạo phê duyệt phân công', status: 'done' },
    { id: 5, title: 'Ban chức năng xử lý', status: 'done' },
    { id: 6, title: 'Văn phòng quản trị xử lý', status: 'active' },
    { id: 7, title: 'Phê duyệt công văn trả lời', status: 'pending' },
    { id: 8, title: 'Văn thư ban hành', status: 'pending' },
    { id: 9, title: 'Người đại diện tiếp nhận', status: 'pending' },
    { id: 10, title: 'Ban chủ trì duyệt kết quả', status: 'pending' }
  ];

  @Input() formKey: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if ('formKey' in changes) {
      this.applyFormKeyRules();
    }
  }

  private applyFormKeyRules(): void {
    if (this.formKey === 'TapDoanDaPheDuyet') {
      this.steps = (this.steps || []).map(step => step.id === 5 ? { ...step, status: 'done' } : step);
      this.steps = (this.steps || []).map(step => step.id === 6 ? { ...step, status: 'active' } : step);
    }else if(this.formKey === 'TapDoanChoPheDuyet' ){
      this.steps = (this.steps || []).map(step => step.id === 5 ? { ...step, status: 'active' } : step);
    }
  }
}
