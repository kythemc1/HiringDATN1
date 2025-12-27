import { Component, Injector, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DynamicTableAction, DynamicTableColumn, DynamicTableConfig } from '../../../shared/components/dynamic-table/dynamic-table.component';

import { CreateUpdateCandidateProfileModalComponent } from './modals/create-update/create-update-candidate-profile-modal.component';

import { HttpClient } from '@angular/common/http';
import { finalize, take, tap, combineLatest, startWith, Subject, debounceTime, switchMap, takeUntil, catchError, of } from 'rxjs';
import { AppBaseComponent } from 'src/app/shared/components/base-component/base-component';
import { CandidateProfileFacadeService } from './service/candidate-profile.facade';
import { CreateCandidateProfileActions, CandidateProfileColumns, createCandidateProfileTableConfig } from './modals/dynamic/dynamic-table';
import { CandidateProfileRowView } from './interface/candidate-profile';

import { CandidateProfileDto, SearchInputDto } from '../../../proxy/dtos/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

type CandidateProfileSearchTerms = SearchInputDto & {
  trangThai?: boolean | null;
};


@Component({
  standalone: false,
  selector: 'vnx-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.less'],
})
export class CandidateProfileComponent extends AppBaseComponent implements OnInit, OnDestroy {
  // #region ViewChild & Constructor
  @ViewChild('inlineCreateUpdate') inlineCreateUpdate: CreateUpdateCandidateProfileModalComponent;
  constructor(
    injector: Injector,
    private facade: CandidateProfileFacadeService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
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
  dataDisplay: CandidateProfileRowView[] = [];
  totalRecords = 0;
  loading = false;
  selectedRows: CandidateProfileRowView[] = [];

  // Search & filter state
  searchKeyword = '';
  showFilter = false;
  searchTerms: CandidateProfileSearchTerms = {
    keyword: '',
    maxResultCount: undefined,
    trangThai: null,
  };

  trangThaiOptionsWithAll = [
    { id: null as boolean | null, displayName: 'Tất cả' },
    { id: true, displayName: 'Đang hoạt động' },
    { id: false, displayName: 'Không hoạt động' },
  ];

  pageIndex = 0;
  // #endregion
  viewMode: 'list' | 'create' | 'edit' | 'view' = 'list';
  formTitle = 'Thông tin cơ bản';
  updateCandidateProfileDto = {} as CandidateProfileDto;
  // #region Menu & Dynamic Table Config

  // Table columns, actions,
  columns: DynamicTableColumn[] = CandidateProfileColumns;
  actions: DynamicTableAction[] = CreateCandidateProfileActions();
  config: DynamicTableConfig = createCandidateProfileTableConfig();

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
          const rows = this.config.rows || 10;
          const normalizedTerms: SearchInputDto = { ...this.searchTerms } as any;
          return this.facade
            .loadPage({
              searchKeyword: this.searchKeyword,
              terms: normalizedTerms,
              pageIndex: this.pageIndex,
              rows,
            })
            .pipe(
              catchError(() => {
                // fallback on error
                return of({ total: 0, data: [] as CandidateProfileRowView[] });
              }),
              finalize(() => {
                this.hideLoading();
                this.cdr.detectChanges(); // <--- FIX 1: Update UI khi API xong (Spinner tắt)
              })
            );
        })
      )
      .subscribe((res: any) => {
        this.totalRecords = res.total || 0;
        this.dataDisplay = res.data || [];
        this.cdr.detectChanges(); // <--- FIX 2: Update UI ngay khi có dữ liệu mới
      });

    // HANDLE ROUTE CHANGE (Create/Edit/View/List)
    combineLatest([data$, params$, query$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([data, params, q]) => {
        // Prefer query param 'mode' over route data so ?mode=view works even when route data defaults to 'list'
        const mode = (q.get('mode') as string) || (data?.['mode'] as string) || 'list';
        const entity = data?.['entity'] as any | null;
        console.log(mode);
        console.log(entity);
        console.log(q);
        console.log(data);
        if (mode === 'create') {
          this.viewMode = 'create';
          this.updateCandidateProfileDto = {} as any;
          this.triggerBuildForm();
        } else if (mode === 'edit') {
          this.viewMode = 'edit';
          if (entity) {
            this.updateCandidateProfileDto = entity as any;
            this.triggerBuildForm();
          } else {
            this.viewMode = 'list';
            this.router.navigate(['/main/danh-muc-chung/candidate-profile']);
          }
        } else if (mode === 'view') {
          this.viewMode = 'view';
          if (entity) {
            this.updateCandidateProfileDto = entity as any;
            this.triggerBuildForm();
          } else {
            this.viewMode = 'list';
            this.router.navigate(['/main/danh-muc-chung/candidate-profile']);
          }
        } else {
          this.viewMode = 'list';
          this.apply();
        }

        this.cdr.detectChanges();
      });
  }

  // Helper để build form an toàn
  private triggerBuildForm() {
    setTimeout(() => {
      if (this.inlineCreateUpdate) {
        this.inlineCreateUpdate.buildForm();
        this.cdr.detectChanges(); // Update tiếp component con sau khi build form
      }
    });
  }

  // #region Data Loading
  private apply(resetLoading: boolean = true) {
    if (resetLoading) {
      this.showLoading();
    }
    this.searchSubject.next();
  }

  // #endregion

  // #region Inline Form (Single Page)
  startCreate(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  startEdit(row: CandidateProfileRowView): void {
    if (!row) return;
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  startView(row: CandidateProfileRowView): void {
    if (!row) return;
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  cancelForm(): void {
    this.viewMode = 'list';
    this.updateCandidateProfileDto = {} as any;
    this.router.navigate(['/main/danh-muc-chung/candidate-profile']);
  }

  onChildSaved(shouldClose?: boolean): void {
    this.viewMode = 'list';
    this.router.navigate(['/main/danh-muc-chung/candidate-profile']).then(() => this.apply());
  }


  onChildCanceled(): void {
    this.cancelForm();
  }
  // #endregion

  // #region Data Operations

  deleteCandidateProfile(id: number): void {
    if (id == null) return;
    this.confirmation.confirm({
      message: this.l('Bạn có chắc chắn muốn xoá bản ghi này không?'),
      key: 'global',
      accept: () => {
        this.showLoading();
        this.facade.deleteOne(id).subscribe({
          next: () => {
            this.showSuccessMessage(this.l('Xóa dữ liệu thành công'));
            this.apply();
          },
          error: (err) => {
            this.showErrorMessage(this.l('Đã xảy ra lỗi khi xóa dữ liệu'));
            this.hideLoading();
          },
          complete: () => this.hideLoading(),
        });
      },
    });
  }

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
    this.config.rows = event.rows;
    this.apply(false);
  }

  onRowsPerPageChange(rows: number) {
    this.config.rows = rows;
    this.pageIndex = 0;
    this.apply();
  }

  onSelectionChange(sel: any[] | any) {
    this.selectedRows = Array.isArray(sel) ? sel : (sel ? [sel] : []);
  }

  onAction(evt: { action: DynamicTableAction; row: CandidateProfileRowView }) {
    const { action, row } = evt;
    if (!action?.key) return;
    switch (action.key) {
      case 'edit':
        this.startEdit(row);
        break;
      case 'view':
        if (!row?.id) return;
        this.startView(row);
        break;
      case 'delete':
        this.deleteCandidateProfile(row?.id);
        break;
      default:
        break;
    }

  }

  onHeaderTitleClick(): void {
    if (this.viewMode !== 'list') {
      this.cancelForm();
    }
  }
  // #endregion
}