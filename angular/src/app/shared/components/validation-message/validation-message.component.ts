import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription, merge, of } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html'
})
export class ValidationMessageComponent implements OnChanges, OnDestroy{
  @Input() control!: AbstractControl | null;
  @Input() fieldName = '';

  private sub: Subscription | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control']) {
      // huỷ subscription cũ
      this.sub?.unsubscribe();
      this.sub = null;

      if (this.control) {
        // kết hợp statusChanges và valueChanges (nếu undefined thay bằng of(null))
        this.sub = merge(
          this.control.statusChanges ?? of(null),
          this.control.valueChanges ?? of(null)
        ).subscribe(() => {
          // khi control thay đổi, đảm bảo component con sẽ kiểm tra lại view
          this.cdr.markForCheck();
        });
      }

      // đánh dấu kiểm tra ngay lần đầu
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get showError(): boolean {
    return !!(this.control && this.control.invalid && this.control.touched);
  }
}
