import { Component, Injector, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DynamicTableAction, DynamicTableColumn, DynamicTableConfig } from '../../../shared/components/dynamic-table/dynamic-table.component';


import { HttpClient } from '@angular/common/http';
import { finalize, take, tap, combineLatest, startWith, Subject, debounceTime, switchMap, takeUntil, catchError, of, throwError } from 'rxjs';
import { AppBaseComponent } from 'src/app/shared/components/base-component/base-component';

import { CreateUpdateJobApplicationDto, JobPostingDto, SearchInputDto } from '../../../proxy/dtos/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobPostingFacadeService } from './service/job-posting.facade';
import { JobPostingRowView } from '../job-posting/interface/job-posting';
import { JobApplicationService } from 'src/app/proxy/controllers/job-application.service';
import { CvApiService } from '../cv/service/cv.service';

type JobApplySearchTerms = SearchInputDto & {
  trangThai?: boolean | null;
};

export function createJobApplyTableConfig(): DynamicTableConfig {
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



@Component({
  standalone: false,
  selector: 'vnx-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.less'],
})
export class JobApplyComponent extends AppBaseComponent implements OnInit, OnDestroy {
  // #region ViewChild & Constructor
  constructor(
    injector: Injector,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobPostingFacadeService: JobPostingFacadeService,
    private jobApplicationService: JobApplicationService,
    private cvApiService: CvApiService,
  ) {
    super(injector);
  }
  // #endregion
  //#region Properties - RxJS Subjects
  private readonly searchSubject = new Subject<void>();
  private readonly destroy$ = new Subject<void>();
  // #endregion
  // #region State
  externalObject: any[] = [];
  // Derived data for current page
  totalRecords = 0;
  loading = false;

  // Search & filter state
  searchKeyword = '';
  showFilter = false;
  searchTerms: JobApplySearchTerms = {
    keyword: '',
    maxResultCount: undefined,
    trangThai: null,
  };
  config: DynamicTableConfig = createJobApplyTableConfig();
  trangThaiOptionsWithAll = [
    { id: null as boolean | null, displayName: 'Tất cả' },
    { id: true, displayName: 'Đang hoạt động' },
    { id: false, displayName: 'Không hoạt động' },
  ];

  pageIndex = 0;
  // #endregion
  viewMode: 'list' | 'create' | 'edit' | 'view' = 'list';
  formTitle = 'Thông tin cơ bản';
  updateJobPostingDto = {} as JobPostingDto;
  dataDisplay: JobPostingRowView[] = [];
  // #region Menu & Dynamic Table Config


  // #endregion

  // #region Lifecycle
  ngOnInit(): void {

    const data$ = this.route.data.pipe(startWith(this.route.snapshot.data));
    const params$ = this.route.paramMap.pipe(startWith(this.route.snapshot.paramMap));
    const query$ = this.route.queryParamMap.pipe(startWith(this.route.snapshot.queryParamMap));

    // RxJS Subject - LOAD DATA
    this.searchSubject
      .pipe(
        debounceTime(250),
        takeUntil(this.destroy$),
        switchMap(() => {
          const normalizedTerms: SearchInputDto = { ...this.searchTerms } as any;
          const rows = this.config.rows || 10;
          return this.jobPostingFacadeService
            .loadPage({
              searchKeyword: this.searchKeyword,
              terms: normalizedTerms,
              pageIndex: this.pageIndex,
              rows,
            })
            .pipe(
              catchError(() => {
                // fallback on error
                return of({ total: 0, data: [] as JobPostingDto[] });
              }),
              finalize(() => {
                this.hideLoading();
                this.cdr.detectChanges(); 
              })
            );
        })
      )
      .subscribe((res: any) => {
        this.totalRecords = res.total || 0;
        this.dataDisplay = res.data || [];
        this.cdr.detectChanges(); 
      });

    // HANDLE ROUTE CHANGE (Create/Edit/View/List)
    combineLatest([data$, params$, query$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([data, params, q]) => {
        // Prefer query param 'mode' over route data so ?mode=view works even when route data defaults to 'list'

        this.viewMode = 'list';
        this.apply();

        this.cdr.detectChanges();
      });
  }

  // Helper để build form an toàn

  // #region Data Loading
  private apply(resetLoading: boolean = true) {
    if (resetLoading) {
      this.showLoading();
    }
    this.searchSubject.next();
  }

  // #endregion

  // #region Inline Form (Single Page)

  
  // #endregion

  // #region Data Operations

  // #endregion

  // #region Modals - Other

  onModalSaved() {
    this.apply();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
    this.destroy$.next(); // <--- Đừng quên unsubscribe
    this.destroy$.complete();
    try {
      (this.externalObject || []).forEach(url => {
        try { URL.revokeObjectURL(url); } catch { }
      });
    } catch { }
    this.externalObject = [];
  }
  // #endregion

  // #region DynamicTable Event Handlers
  onSearchKeywordChange(value: string) {
    this.searchKeyword = value;
    // optional instant search when >= 3 chars
    if (!value || value.length >= 3) {
      this.pageIndex = 0;
      this.apply();
    }
  }

  onSearchSubmit() {
    this.pageIndex = 0;
    this.apply();
  }

  onToggleFilter(show: boolean) {
    this.showFilter = show;
  }

  onPageChange(event: { page: number; rows: number }) {
    this.pageIndex = event.page ?? 0;
    this.apply(false);
  }

  onRowsPerPageChange(rows: number) {
    this.pageIndex = 0;
    this.apply();
  }

  onSelectionChange(sel: any[] | any) {
  }

  selectedJob: any;

  onSelectJob(job: any) {
    this.selectedJob = job;
    // Nếu bạn muốn hiển thị chế độ view detail:
    // this.viewMode = 'list'; 
  }

  onApplyToJob(job: JobPostingRowView) {
    if (!job?.id) {
      return;
    }

    this.showLoading();

    const searchPayload: SearchInputDto = {
      keyword: '',
      skipCount: 0,
      maxResultCount: 1,
    };

    this.cvApiService
      .getCv(searchPayload)
      .pipe(
        take(1),
        switchMap((res: any) => {
          const payloadCandidate = (res?.items || [])[0] as any;
          const candidateProfileId =
            payloadCandidate?.candidateProfileDto?.id ??
            payloadCandidate?.CVDto?.candidateProfileDto?.id ??
            payloadCandidate?.profile?.id ??
            payloadCandidate?.candidateProfile?.id;

          if (!candidateProfileId) {
            return throwError(() => new Error('Vui lòng cập nhật hồ sơ ứng tuyển trước khi nộp đơn.'));
          }

          const dto: CreateUpdateJobApplicationDto = {
            jobId: job.id,
            candidateProfileId,
            profileSnapshotJson: JSON.stringify(payloadCandidate),
          };

          return this.jobApplicationService.create(dto);
        }),
        finalize(() => {
          this.hideLoading();
        })
      )
      .subscribe({
        next: () => {
          this.showSuccessMessage('Ứng tuyển thành công');
        },
        error: (err) => {
          this.showErrorMessage(err?.message ?? 'Đã xảy ra lỗi khi ứng tuyển');
        },
      });
  }
  // #endregion
}