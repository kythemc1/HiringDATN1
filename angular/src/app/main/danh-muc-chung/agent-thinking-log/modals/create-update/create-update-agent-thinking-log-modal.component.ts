import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AgentThinkingLogService } from '../../../../../proxy/controllers/agent-thinking-log.service';
import {
  AgentThinkingLogDto,
  CreateUpdateAgentThinkingLogDto,
} from '../../../../../proxy/dtos/models';
import { Dialog } from 'primeng/dialog';
import { EMPTY, catchError, finalize, map, of, switchMap, takeWhile, tap, timer } from 'rxjs';
import { AppBaseComponent } from 'src/app/shared/components/base-component/base-component';

@Component({
  standalone: false,
  selector: 'app-create-update-agent-thinking-log-modal',
  templateUrl: './create-update-agent-thinking-log-modal.component.html',
  styleUrls: ['./create-update-agent-thinking-log-modal.component.less'],
})
export class CreateUpdateAgentThinkingLogModalComponent
  extends AppBaseComponent
  implements OnInit, OnDestroy, OnChanges {
  //#region Variables
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @ViewChild(Dialog, { static: false }) private modal: Dialog;
  @Output() canceled: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('firstElm', { static: false }) firstElm: ElementRef;
  @Input() inline = false;
  @Input() readOnly = false;
  isModalOpen = false;
  @Input() modalTitle: string;
  @Input() updateAgentThinkingLogDto: AgentThinkingLogDto = {} as AgentThinkingLogDto;

  form: FormGroup;

  //#endregion

  //#region Constructor and Lifecycle
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private AgentThinkingLogService: AgentThinkingLogService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('updateAgentThinkingLogDto' in changes && this.inline) {
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
    this.buildForm();
    this.isModalOpen = true;
    setTimeout(() => this.firstElm.nativeElement.focus(), 300);
  }

  buildForm(): void {
    const dto = this.updateAgentThinkingLogDto ?? ({} as AgentThinkingLogDto);

    this.form = this.fb.group({
      messageId: [dto.messageId ?? null, [Validators.required, Validators.min(0)]],
      agentName: [dto.agentName ?? '', [this.noWhitespaceValidator()]],
      stepName: [dto.stepName ?? ''],
      inputData: [dto.inputData ?? ''],
      outputData: [dto.outputData ?? ''],
      durationMs: [dto.durationMs ?? null, [Validators.required, Validators.min(0)]],
    });

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
    const formValue = { ...this.form.value } as CreateUpdateAgentThinkingLogDto;
    const payload: CreateUpdateAgentThinkingLogDto = {
      ...formValue,
      messageId: Number(formValue.messageId),
      durationMs: Number(formValue.durationMs),
      agentName: formValue.agentName?.trim(),
      stepName: formValue.stepName?.trim(),
      inputData: formValue.inputData?.trim(),
      outputData: formValue.outputData?.trim(),
    };

    const request = this.updateAgentThinkingLogDto?.id
      ? this.AgentThinkingLogService.update(this.updateAgentThinkingLogDto.id, payload)
      : this.AgentThinkingLogService.create(payload);
    this.showLoading();
    request
      .pipe(
        takeWhile(() => this.componentActive),
        tap(() => {
          const isEdit = !!this.updateAgentThinkingLogDto.id;
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
    const formValue = { ...this.form.value } as CreateUpdateAgentThinkingLogDto;

    const payload: CreateUpdateAgentThinkingLogDto = {
      ...formValue,
      messageId: Number(formValue.messageId),
      durationMs: Number(formValue.durationMs),
      agentName: formValue.agentName?.trim(),
      stepName: formValue.stepName?.trim(),
      inputData: formValue.inputData?.trim(),
      outputData: formValue.outputData?.trim(),
    };

    const isUpdate = !!this.updateAgentThinkingLogDto?.id;
    const request = isUpdate
      ? this.AgentThinkingLogService.update(this.updateAgentThinkingLogDto.id, payload)
      : this.AgentThinkingLogService.create(payload);

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
          this.updateAgentThinkingLogDto = {} as AgentThinkingLogDto;
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
