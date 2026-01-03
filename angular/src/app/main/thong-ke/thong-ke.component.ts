import { Component, OnInit, AfterViewInit, Injector, ChangeDetectorRef } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/base-component/base-component';
import { JobApplicationService } from 'src/app/proxy/controllers/job-application.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
declare var Chart: any; // Khai báo để Angular không báo lỗi không tìm thấy Chart

@Component({
  selector: 'vnx-thong-ke',
  standalone: true,
  imports: [CommonModule, SharedModule, NzSpinModule, NzCardModule,NzGridModule],
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.less']
})
export class ThongKeComponent extends AppBaseComponent implements OnInit {
  loading = false;
  quickStats = [
    { label: 'Tổng hồ sơ', value: 1248, icon: 'file-search', bgColor: '#1890ff', trend: 12 },
    { label: 'Đang phỏng vấn', value: 45, icon: 'solution', bgColor: '#722ed1', trend: 5 },
    { label: 'Hồ sơ mới', value: 12, icon: 'plus-circle', bgColor: '#52c41a', trend: 8 },
    { label: 'Từ chối', value: 89, icon: 'close-circle', bgColor: '#f5222d', trend: -2 }
  ];

  constructor(injector: Injector, private jobService: JobApplicationService, private cdr: ChangeDetectorRef) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    // Giả sử API trả về dữ liệu thành công
    this.jobService.getCountByStatus().subscribe(res => {
      this.initPieChart(res);
      this.loading = false;
      this.cdr.detectChanges();
    });

    this.jobService.getApplicationTrend().subscribe(res => {
      this.initLineChart(res);
    });
  }

  initPieChart(data: any[]) {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(x => x.label),
        datasets: [{
          data: data.map(x => x.value),
          backgroundColor: ['#1890ff', '#52c41a', '#fadb14', '#f5222d', '#722ed1']
        }]
      }
    });
  }

  initLineChart(data: any[]) {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(x => x.label),
        datasets: [{
          label: 'Số lượng hồ sơ',
          data: data.map(x => x.value),
          borderColor: '#1890ff',
          fill: true,
          backgroundColor: 'rgba(24, 144, 255, 0.1)',
          tension: 0.4
        }]
      }
    });
  }
}