import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { Subscription, fromEvent, debounceTime } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  @ViewChild('calendar') calendar!: Calendar;
  @Input() id = 'app-date-picker';
  @Input() placeholder = '';
  @Input() showTime = false;
  @Input() hourFormat: string | number = 24;
  @Input() stepMinute = 1;
  @Input() stepHour = 1;

  value: string | null = null;
  calendarValue: Date | null = null;
  disabled = false;
  private resizeSubscription!: Subscription;

  onChange = (_: any) => { };
  onTouched = () => { };

  ngOnInit() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.closeCalendarPanel();
      });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  writeValue(val: any): void {
    if (typeof val === 'string') {
      this.value = val;
      this.calendarValue = this.parseStringToDate(val);
    } else if (val instanceof Date) {
      this.calendarValue = val;
      this.value = this.formatDateToString(val);
    } else {
      this.value = null;
      this.calendarValue = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputMaskChange(val: string) {
    if (this.disabled) return;
    this.value = val;
    this.onChange(val);
    this.onTouched();

    if (this.showTime) {
      // Validate format: dd/mm/yyyy hh:mm
      if (val && /^\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}$/.test(val)) {
        this.calendarValue = this.parseStringToDate(val);
      } else {
        this.calendarValue = null;
      }
    } else {
      // Validate format: dd/mm/yyyy
      if (val && /^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
        this.calendarValue = this.parseStringToDate(val);
      } else {
        this.calendarValue = null;
      }
    }
  }

  onCalendarChange(date: Date) {
    if (this.disabled) return;
    
    if (date) {
      this.value = this.formatDateToString(date);
    } else {
      this.value = null;
    }

    this.calendarValue = date || null;
    this.onChange(this.value);
    this.onTouched();
  }

  onCalendarShow(event: any) { }

  onCalendarClose() { }

  private parseStringToDate(val: string): Date | null {
    if (!val) return null;

    if (this.showTime) {
      // Parse format: dd/mm/yyyy hh:mm
      const match = val.match(/^(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})$/);
      if (match) {
        const [, day, month, year, hour, minute] = match;
        return new Date(+year, +month - 1, +day, +hour, +minute);
      }
    } else {
      // Parse format: dd/mm/yyyy
      const parts = val.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return new Date(+year, +month - 1, +day);
      }
    }
    
    return null;
  }

  private formatDateToString(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    
    if (this.showTime) {
      const hour = ('0' + date.getHours()).slice(-2);
      const minute = ('0' + date.getMinutes()).slice(-2);
      return `${day}/${month}/${year} ${hour}:${minute}`;
    }
    
    return `${day}/${month}/${year}`;
  }

  private closeCalendarPanel() {
    if (this.calendar) {
      try {
        this.calendar.hideOverlay();
      } catch {
        const calendarPanel = document.querySelector('.p-datepicker') || document.querySelector('.p-datepicker-panel');
        if (calendarPanel) {
          (calendarPanel as HTMLElement).style.display = 'none';
        }
      }
    }
  }
}