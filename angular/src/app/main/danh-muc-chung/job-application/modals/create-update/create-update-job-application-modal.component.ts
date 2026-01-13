import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobApplicationService } from '../../../../../proxy/controllers/job-application.service';
import { JobApplicationDto, CreateUpdateJobApplicationDto } from '../../../../../proxy/dtos/models';
import { AppBaseComponent } from 'src/app/shared/components/base-component/base-component';
import { applicationStatusOptions } from '../../../../../proxy/dtos/application-status.enum';
import { EMPTY, catchError, finalize, takeWhile, tap } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-create-update-job-application-modal',
  templateUrl: './create-update-job-application-modal.component.html',
  styleUrls: ['./create-update-job-application-modal.component.less'],
})
export class CreateUpdateJobApplicationModalComponent extends AppBaseComponent implements OnInit, OnDestroy {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Output() canceled: EventEmitter<void> = new EventEmitter<void>();
  
  @Input() inline = false;
  @Input() readOnly = false;
  @Input() updateJobApplicationDto: JobApplicationDto;

  form: FormGroup;
  statusOptions = applicationStatusOptions;
  snapshot: any = null;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private jobApplicationService: JobApplicationService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('updateJobApplicationDto' in changes) {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  buildForm(): void {
    const dto = this.updateJobApplicationDto ?? ({} as JobApplicationDto);
    
    // Parse dữ liệu theo cấu trúc JSON bạn cung cấp
    try {
      this.snapshot = dto.profileSnapshotJson ? JSON.parse(dto.profileSnapshotJson) : null;
    } catch (e) {
      this.snapshot = null;
    }

    this.form = this.fb.group({
      jobId: [{ value: dto.jobId, disabled: true }],
      candidateProfileId: [{ value: dto.candidateProfileId, disabled: true }],
      status: [dto.status ?? null, [Validators.required]],
      aiMatchingScore: [dto.aiMatchingScore ?? null],
      coverLetter: [dto.coverLetter ?? ''],
    });

    if (this.readOnly) {
      this.form.get('aiMatchingScore')?.disable();
      this.form.get('coverLetter')?.disable();
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const payload: CreateUpdateJobApplicationDto = {
      ...formValue,
      jobId: Number(formValue.jobId),
      candidateProfileId: Number(formValue.candidateProfileId),
      aiMatchingScore: formValue.aiMatchingScore ? Number(formValue.aiMatchingScore) : undefined,
      profileSnapshotJson: this.updateJobApplicationDto.profileSnapshotJson // Giữ nguyên snapshot cũ
    };

    this.showLoading();
    this.jobApplicationService.update(this.updateJobApplicationDto.id, payload)
      .pipe(
        takeWhile(() => this.componentActive),
        tap(() => {
          this.showSuccessMessage("Cập nhật trạng thái thành công");
          this.saved.emit(true);
        }),
        catchError(() => {
          this.showErrorMessage("Lỗi khi cập nhật");
          return EMPTY;
        }),
        finalize(() => this.hideLoading())
      ).subscribe();
  }

  close(): void {
    this.canceled.emit();
  }
}