import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/base-component/base-component';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent extends AppBaseComponent implements OnInit {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this.loadNotifications();
  }

  // loadNotifications(loadMore = false): void {
  //   if (this.loading) return;

  //   this.loading = true;

  //   if (!loadMore) {
  //     this.searchTerms.skipCount = 0;
  //   }

  //   this.searchTerms.keyword = this.activeTab === 'unread' ? 'false' : undefined;

  //   this._thongBao.getAllNotificationByUserIdByInput(this.searchTerms)
  //     .pipe(
  //       takeWhile(() => this.componentActive),
  //       tap((result: ThongBaoUserDto) => {
  //         if (loadMore) {
  //           this.notifications = [...this.notifications, ...result.thongBaoDtos];
  //         } else {
  //           this.notifications = result.thongBaoDtos;
  //         }

  //         this.unreadCount = result.unreadNotifications;
  //         this.hasMore = result.thongBaoDtos.length === this.searchTerms.maxResultCount;
          
  //         if (result.thongBaoDtos.length > 0) {
  //           this.searchTerms.skipCount! += this.searchTerms.maxResultCount!;
  //         }

  //         this.cdr.detectChanges();
  //       }),
  //       finalize(() => {
  //         this.loading = false;
  //         this.cdr.detectChanges(); 
  //       }),
        
  //     )
  //     .subscribe();
  // }

  // togglePanel(event: Event): void {
  //   this.notifPanel.toggle(event);
  //   if (this.notifPanel.overlayVisible) {
  //     this.activeTab = 'all';
  //     this.searchTerms.skipCount = 0;
  //     this.notifications = [];
  //     this.hasMore = true;
  //     this.loadNotifications();
  //   }
  // }

  // switchTab(tab: 'all' | 'unread'): void {
  //   if (this.activeTab === tab) return;
  //   this.activeTab = tab;
  //   this.searchTerms.skipCount = 0;
  //   this.notifications = [];
  //   this.hasMore = true;
  //   this.loadNotifications();
  // }

  // onNotificationClick(notification: ThongBaoForViewDto): void {
  //   if (!notification.isDoc) {
  //     this.markAsRead(notification);
  //   }

  //   if (notification.lienKet) {
  //     this.router.navigate([notification.lienKet]);
  //     this.notifPanel.hide();
  //   }
  // }

  // markAsRead(notification: ThongBaoForViewDto): void {
  //   this._thongBao.markReadNotificationByIdNotis(notification.id)
  //     .pipe(
  //       takeWhile(() => this.componentActive),
  //       tap(() => {
  //         notification.isDoc = true;
  //         notification.thoiGianDoc = new Date().toISOString();
  //         this.unreadCount = Math.max(0, this.unreadCount - 1);
  //       })
  //     )
  //     .subscribe({
  //       error: (err) => {
  //         console.error('Lỗi khi đánh dấu đã đọc:', err);
  //       }
  //     });
  // }

  // loadMore(): void {
  //   if (!this.hasMore || this.loading) return;
  //   this.loadNotifications(true);
  // }

  // viewAll(): void {
  //   this.notifPanel.hide();
  //   this.router.navigate(['/main/thong-bao-nguoi-dung']);
  // }

  // getTimeAgo(dateString?: string): string {
  //   if (!dateString) return '';

  //   const date = new Date(dateString);
  //   const now = new Date();
  //   const diffMs = now.getTime() - date.getTime();
  //   const diffMins = Math.floor(diffMs / 60000);
  //   const diffHours = Math.floor(diffMs / 3600000);
  //   const diffDays = Math.floor(diffMs / 86400000);

  //   if (diffMins < 1) return 'Vừa xong';
  //   if (diffMins < 60) return `${diffMins} phút trước`;
  //   if (diffHours < 24) return `${diffHours} giờ trước`;
  //   if (diffDays < 7) return `${diffDays} ngày trước`;

  //   return date.toLocaleDateString('vi-VN');
  // }
}