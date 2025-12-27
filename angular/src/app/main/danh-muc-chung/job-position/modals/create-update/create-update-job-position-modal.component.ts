import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { JobPositionService } from '../../../../../proxy/controllers/job-position.service';
import {  JobPositionDto,CreateUpdateJobPositionDto } from '../../../../../proxy/dtos/models';
import { Dialog } from 'primeng/dialog';
import { EMPTY, catchError, finalize, map, of, switchMap, takeWhile, tap, timer } from 'rxjs';
import { AppBaseComponent } from 'src/app/shared/components/base-component/base-component';

@Component({
  standalone: false,
  selector: 'app-create-update-job-position-modal',
  templateUrl: './create-update-job-position-modal.component.html',
  styleUrls: ['./create-update-job-position-modal.component.less'],
})
export class CreateUpdateJobPositionModalComponent
  extends AppBaseComponent
  implements OnInit, OnDestroy {
  //#region Variables
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @ViewChild(Dialog, { static: false }) private modal: Dialog;
  @Output() canceled: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('firstElm', { static: false }) firstElm: ElementRef;
  @Input() inline = false;
  @Input() readOnly = false;
  isModalOpen = false;
  @Input() modalTitle: string;
  @Input() updateJobPositionDto: JobPositionDto;

  form: FormGroup;

  //#endregion

  //#region Constructor and Lifecycle
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private JobPositionService: JobPositionService,
  ) {
    super(injector);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('updateJobPositionDto' in changes && this.inline) {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
  //#endregion

  //#region Custom methods
  show(): void {
    if (this.inline) return;
    this.isModalOpen = true;
    setTimeout(() => this.firstElm.nativeElement.focus(), 300);
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        
      },
    );

    // ⚙️ Nếu là read-only thì disable toàn form và return sớm
    if (this.readOnly) {
      this.form.disable();
      return;
    }

  }

  //#endregion

  //#region OnChange methods

  //#endregion

  //#region Main methods
  save(): void {
    if (this.form.invalid || this.form.pending) {
      this.form.markAllAsTouched();
      return;
    }
    // Preprocess form data: convert empty strings to null for decimal fields
    const formValue = { ...this.form.value };
    if (formValue.tenJobPosition) {
      formValue.tenJobPosition = formValue.tenJobPosition.trim();
    }

    if (formValue.vonTapDoanTu === '' || formValue.vonTapDoanTu === undefined) {
      formValue.vonTapDoanTu = null;
    }
    if (formValue.vonTapDoanDen === '' || formValue.vonTapDoanDen === undefined) {
      formValue.vonTapDoanDen = null;
    }

    const request = this.updateJobPositionDto.id
      ? this.JobPositionService.update(this.updateJobPositionDto.id, formValue)
      : this.JobPositionService.create(formValue);
    this.showLoading();
    request
      .pipe(
        takeWhile(() => this.componentActive),
        tap(() => {
          const isEdit = !!this.updateJobPositionDto.id;
          this.showSuccessMessage("Lưu dữ liệu thành công");
          this.isModalOpen = false;
          try { this.saved.emit(true); } catch { }
        }),
        catchError((err) => {
          // Lấy đúng message từ API trả về
          
          this.showErrorMessage("Đã xảy ra lỗi khi lưu dữ liệu");
          return EMPTY;
        }),
        finalize(() => {
          this.hideLoading();
        })
      )
      .subscribe();
  }

  saveAndNew(): void {
    if (this.form.invalid) return;

    // Preprocess form data: convert empty strings to null for decimal fields
    const formValue = { ...this.form.value };

    const isUpdate = !!this.updateJobPositionDto.id;
    const request = isUpdate
      ? this.JobPositionService.update(this.updateJobPositionDto.id, formValue as CreateUpdateJobPositionDto)
      : this.JobPositionService.create(formValue as CreateUpdateJobPositionDto);

    this.showLoading();

    request
      .pipe(
        takeWhile(() => this.componentActive),
        tap(() => {
          const message = isUpdate
            ? "Cập nhật dữ liệu thành công"
            : "Thêm mới dữ liệu thành công";
          this.message.add({
            severity: 'info',
            summary: "Thông báo",
            detail: message,
            key: 'global',
            life: 3000,
          });
          try { this.saved.emit(false); } catch { }
          // Reset form and DTO for new entry
          this.updateJobPositionDto = {} as JobPositionDto;
          this.form.reset();
          this.buildForm(); // Rebuild to apply default validators/state

          setTimeout(() => {
            this.firstElm.nativeElement.focus();
          });
        }),
        finalize(() => {
          this.hideLoading();
        })
      )
      .subscribe();
  }

  close(): void {
    if (this.inline) {
      this.canceled.emit();
      this.form?.reset();
      return;
    }
    this.isModalOpen = false;
    this.form.reset();
  }


  //#region Private methods
  private noWhitespaceValidator(): ValidatorFn {
    return (control): ValidationErrors | null => {
      const value = control.value;

      // Nếu không có giá trị thì không validate (để Validators.required xử lý)
      if (!value) {
        return null;
      }

      // Kiểm tra nếu chỉ toàn khoảng trắng
      if (typeof value === 'string' && value.trim().length === 0) {
        return { whitespace: true };
      }

      return null;
    };
  }


  //#endregion
}
