/**
 * Date Utilities for Angular Application
 * Hỗ trợ việc xử lý và định dạng ngày tháng trong ứng dụng Angular
 *
 * Features:
 * - Tạo các khoảng ngày phổ biến (hôm nay, tuần này, tháng này, năm nay, v.v.)
 * - Hỗ trợ khoảng ngày tùy chỉnh
 * - Định dạng ngày tháng theo chuẩn Việt Nam
 * - Các hàm tiện ích liên quan đến ngày tháng
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// ===== ENUMS & INTERFACES =====

export enum DateRangeType {
  TODAY = 'today',
  THIS_WEEK = 'this_week',
  THIS_MONTH = 'this_month',
  THIS_YEAR = 'this_year',
  YESTERDAY = 'yesterday',
  LAST_WEEK = 'last_week',
  LAST_MONTH = 'last_month',
  LAST_YEAR = 'last_year',
  LAST_7_DAYS = 'last_7_days',
  LAST_30_DAYS = 'last_30_days',
  LAST_90_DAYS = 'last_90_days',
  CUSTOM = 'custom',
}

export interface DateRange {
  fromDate: string; // Format: YYYY-MM-DD
  toDate: string; // Format: YYYY-MM-DD
  label: string; // Human readable label
}

export interface DateRangeOptions {
  type: DateRangeType;
  customFromDate?: Date | string;
  customToDate?: Date | string;
  baseDate?: Date;
}

// ===== MAIN DATE RANGE FUNCTIONS =====

/**
 * Generate date range based on specified type and options
 * @param options Configuration options for date range generation
 * @returns DateRange object with fromDate, toDate in YYYY-MM-DD format and label
 */
export function getDateRange(options: DateRangeOptions): DateRange {
  const baseDate = options.baseDate ? new Date(options.baseDate) : new Date();

  switch (options.type) {
    case DateRangeType.TODAY:
      return getTodayRange(baseDate);

    case DateRangeType.YESTERDAY:
      return getYesterdayRange(baseDate);

    case DateRangeType.THIS_WEEK:
      return getThisWeekRange(baseDate);

    case DateRangeType.LAST_WEEK:
      return getLastWeekRange(baseDate);

    case DateRangeType.THIS_MONTH:
      return getThisMonthRange(baseDate);

    case DateRangeType.LAST_MONTH:
      return getLastMonthRange(baseDate);

    case DateRangeType.THIS_YEAR:
      return getThisYearRange(baseDate);

    case DateRangeType.LAST_YEAR:
      return getLastYearRange(baseDate);

    case DateRangeType.LAST_7_DAYS:
      return getLastNDaysRange(baseDate, 7);

    case DateRangeType.LAST_30_DAYS:
      return getLastNDaysRange(baseDate, 30);

    case DateRangeType.LAST_90_DAYS:
      return getLastNDaysRange(baseDate, 90);

    case DateRangeType.CUSTOM:
      return getCustomRange(options.customFromDate, options.customToDate);

    default:
      throw new Error(`Unsupported date range type: ${options.type}`);
  }
}

/**
 * Quick date range generation for common scenarios
 */
export function getQuickDateRange(type: DateRangeType): DateRange {
  return getDateRange({ type });
}

/**
 * Get all available date range options for dropdown
 */
export function getDateRangeOptions(): Array<{ value: DateRangeType; label: string }> {
  return [
    { value: DateRangeType.TODAY, label: 'Hôm nay' },
    { value: DateRangeType.YESTERDAY, label: 'Hôm qua' },
    { value: DateRangeType.THIS_WEEK, label: 'Tuần này' },
    { value: DateRangeType.LAST_WEEK, label: 'Tuần trước' },
    { value: DateRangeType.THIS_MONTH, label: 'Tháng này' },
    { value: DateRangeType.LAST_MONTH, label: 'Tháng trước' },
    { value: DateRangeType.THIS_YEAR, label: 'Năm này' },
    { value: DateRangeType.LAST_YEAR, label: 'Năm trước' },
    { value: DateRangeType.LAST_7_DAYS, label: '7 ngày qua' },
    { value: DateRangeType.LAST_30_DAYS, label: '30 ngày qua' },
    { value: DateRangeType.LAST_90_DAYS, label: '90 ngày qua' },
    { value: DateRangeType.CUSTOM, label: 'Tùy chọn' },
  ];
}

// ===== SPECIFIC DATE RANGE FUNCTIONS =====

function getTodayRange(baseDate: Date): DateRange {
  const today = formatDateToYYYYMMDD(baseDate);
  return {
    fromDate: today,
    toDate: today,
    label: 'Hôm nay',
  };
}

function getYesterdayRange(baseDate: Date): DateRange {
  const yesterday = new Date(baseDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateToYYYYMMDD(yesterday);

  return {
    fromDate: yesterdayStr,
    toDate: yesterdayStr,
    label: 'Hôm qua',
  };
}

function getThisWeekRange(baseDate: Date): DateRange {
  const startOfWeek = getStartOfWeek(baseDate);
  const endOfWeek = getEndOfWeek(baseDate);

  return {
    fromDate: formatDateToYYYYMMDD(startOfWeek),
    toDate: formatDateToYYYYMMDD(endOfWeek),
    label: 'Tuần này',
  };
}

function getLastWeekRange(baseDate: Date): DateRange {
  const lastWeekDate = new Date(baseDate);
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);

  const startOfLastWeek = getStartOfWeek(lastWeekDate);
  const endOfLastWeek = getEndOfWeek(lastWeekDate);

  return {
    fromDate: formatDateToYYYYMMDD(startOfLastWeek),
    toDate: formatDateToYYYYMMDD(endOfLastWeek),
    label: 'Tuần trước',
  };
}

function getThisMonthRange(baseDate: Date): DateRange {
  const startOfMonth = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const endOfMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);

  return {
    fromDate: formatDateToYYYYMMDD(startOfMonth),
    toDate: formatDateToYYYYMMDD(endOfMonth),
    label: 'Tháng này',
  };
}

function getLastMonthRange(baseDate: Date): DateRange {
  const lastMonth = baseDate.getMonth() - 1;
  const year = lastMonth < 0 ? baseDate.getFullYear() - 1 : baseDate.getFullYear();
  const month = lastMonth < 0 ? 11 : lastMonth;

  const startOfLastMonth = new Date(year, month, 1);
  const endOfLastMonth = new Date(year, month + 1, 0);

  return {
    fromDate: formatDateToYYYYMMDD(startOfLastMonth),
    toDate: formatDateToYYYYMMDD(endOfLastMonth),
    label: 'Tháng trước',
  };
}

function getThisYearRange(baseDate: Date): DateRange {
  const startOfYear = new Date(baseDate.getFullYear(), 0, 1);
  const endOfYear = new Date(baseDate.getFullYear(), 11, 31);

  return {
    fromDate: formatDateToYYYYMMDD(startOfYear),
    toDate: formatDateToYYYYMMDD(endOfYear),
    label: 'Năm này',
  };
}

function getLastYearRange(baseDate: Date): DateRange {
  const lastYear = baseDate.getFullYear() - 1;
  const startOfLastYear = new Date(lastYear, 0, 1);
  const endOfLastYear = new Date(lastYear, 11, 31);

  return {
    fromDate: formatDateToYYYYMMDD(startOfLastYear),
    toDate: formatDateToYYYYMMDD(endOfLastYear),
    label: 'Năm trước',
  };
}

function getLastNDaysRange(baseDate: Date, days: number): DateRange {
  const endDate = new Date(baseDate);
  endDate.setDate(endDate.getDate() - 1); // Yesterday as end date

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (days - 1));

  return {
    fromDate: formatDateToYYYYMMDD(startDate),
    toDate: formatDateToYYYYMMDD(endDate),
    label: `${days} ngày qua`,
  };
}

function getCustomRange(fromDate?: Date | string, toDate?: Date | string): DateRange {
  if (!fromDate || !toDate) {
    throw new Error('Custom date range requires both fromDate and toDate');
  }

  const from = typeof fromDate === 'string' ? new Date(fromDate) : fromDate;
  const to = typeof toDate === 'string' ? new Date(toDate) : toDate;

  if (from > to) {
    throw new Error('fromDate must be before or equal to toDate');
  }

  return {
    fromDate: formatDateToYYYYMMDD(from),
    toDate: formatDateToYYYYMMDD(to),
    label: 'Tùy chọn',
  };
}

// ===== HELPER FUNCTIONS =====

function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
}

function getEndOfWeek(date: Date): Date {
  const startOfWeek = getStartOfWeek(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return endOfWeek;
}

function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getStartOfDayUTC(d: Date): Date {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0));
}

export function getEndOfDayUTC(d: Date): Date {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999));
}

// ===== ADDITIONAL UTILITY FUNCTIONS =====

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Get difference in days between two dates
 */
export function diffInDays(date1: Date, date2: Date): number {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * Format date to Vietnamese locale
 */
export function formatDateToVietnamese(date: Date): string {
  return date.toLocaleDateString('vi-VN');
}

export function formatDateToVietnameseSafe(dateInput: any): string {
  if (!dateInput) return '-';
  try {
    const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('vi-VN');
  } catch {
    return '-';
  }
}

/**
 * Format datetime to Vietnamese locale
 */
export function formatDateTimeToVietnamese(date: Date): string {
  return date.toLocaleString('vi-VN');
}

/**
 * Parse YYYY-MM-DD string to Date object
 */
export function parseYYYYMMDD(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Check if date is weekend (Saturday or Sunday)
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

/**
 * Get Vietnamese day name
 */
export function getVietnameseDayName(date: Date): string {
  const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  return days[date.getDay()];
}

/**
 * Get Vietnamese month name
 */
export function getVietnameseMonthName(date: Date): string {
  const months = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];
  return months[date.getMonth()];
}

function parseToDate(value: any): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return new Date(value);
  }

  if (typeof value === 'string') {
    const [d, m, y] = value.split('/');
    const day = Number(d);
    const month = Number(m) - 1;
    const year = Number(y);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

    const date = new Date(year, month, day);
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
      return null;
    }

    return date;
  }

  return null;
}

/**
 * Check value <= maxDate or < maxDate
 * @param maxDate Date | () => Date | null
 * @param allowEqual true => <= , false => <
 */
export function maxDateValidator(
  maxDate: Date | (() => Date | null),
  allowEqual: boolean = false
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valueDate = parseToDate(control.value);
    if (!valueDate) return null;

    const max = typeof maxDate === 'function' ? parseToDate(maxDate()) : parseToDate(maxDate);

    if (!max) return null;

    // set về đầu ngày để so sánh
    valueDate.setHours(0, 0, 0, 0);
    max.setHours(0, 0, 0, 0);

    if (allowEqual) {
      if (valueDate > max) {
        return { maxDate: { max, actual: valueDate } };
      }
    } else {
      if (valueDate >= max) {
        return { maxDate: { max, actual: valueDate } };
      }
    }

    return null;
  };
}

/**
 *
 * @returns Validator function to check date format "dd/mm/yyyy" and validate actual date
 */
export function dateFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = (control.value as string)?.trim?.() ?? '';
    if (!value) return null;

    if (value.includes('_')) return null;

    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!dateRegex.test(value)) return { invalidDate: true };

    const [dayStr, monthStr, yearStr] = value.split('/');
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    const maxDaysInMonth = new Date(year, month, 0).getDate();
    if (day > maxDaysInMonth) {
      return { invalidDate: true };
    }
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      return { invalidDate: true };
    }

    return null;
  };
}

/**
 * Validator to check date against today.
 * @param allowToday true => date <= today, false => date < today
 */
export function relativeDateValidator(allowToday: boolean = false): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Kiểm tra giá trị rỗng
    const value = control.value;
    if (!value) return null;
    let date: Date;
    if (value instanceof Date) {
      date = new Date(value); // Tạo bản sao để tránh thay đổi giá trị gốc
    } else if (typeof value === 'string') {
      const [dayStr, monthStr, yearStr] = value.split('/');
      const day = parseInt(dayStr, 10);
      const month = parseInt(monthStr, 10) - 1; // Tháng 0-based
      const year = parseInt(yearStr, 10);

      // Kiểm tra xem có phân tách thành công và giá trị hợp lệ không
      if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

      date = new Date(year, month, day);
      // Kiểm tra xem ngày có hợp lệ không (nếu không, date sẽ bị điều chỉnh)
      if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        return null;
      }
    } else {
      return null;
    }

    // Lấy ngày hiện tại và đặt về đầu ngày để so sánh
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // So sánh dựa trên tham số allowToday
    if (allowToday) {
      if (date > today) {
        return { futureDate: true };
      }
    } else {
      if (date >= today) {
        return { futureDate: true };
      }
    }

    return null; // Hợp lệ
  };
}

/**
 * Validator to check date against today.
 * @param allowToday true => date >= today, false => date > today
 */
export function pastDateValidator(allowToday: boolean = false): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Kiểm tra giá trị rỗng
    const value = control.value;
    if (!value) return null;
    let date: Date;
    if (value instanceof Date) {
      date = new Date(value); // Tạo bản sao để tránh thay đổi giá trị gốc
    } else if (typeof value === 'string') {
      const [dayStr, monthStr, yearStr] = value.split('/');
      const day = parseInt(dayStr, 10);
      const month = parseInt(monthStr, 10) - 1; // Tháng 0-based
      const year = parseInt(yearStr, 10);

      // Kiểm tra xem có phân tách thành công và giá trị hợp lệ không
      if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

      date = new Date(year, month, day);
      // Kiểm tra xem ngày có hợp lệ không (nếu không, date sẽ bị điều chỉnh)
      if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        return null;
      }
    } else {
      return null;
    }

    // Lấy ngày hiện tại và đặt về đầu ngày để so sánh
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // So sánh dựa trên tham số allowToday
    if (allowToday) {
      if (date < today) {
        return { pastDate: true };
      }
    } else {
      if (date <= today) {
        return { pastDate: true };
      }
    }

    return null; // Hợp lệ
  };
}

/**
 * Parse date string dd/mm/yyyy và set thời gian 00:00:00
 * @param dateStr - Chuỗi ngày định dạng dd/mm/yyyy
 * @returns ISO string với thời gian 00:00:00
 */
export function parseDateToStartOfDay(dateStr: string): string | undefined {
  if (!dateStr) return undefined;

  const parts = dateStr.split('/');
  if (parts.length !== 3) return undefined;

  const day = +parts[0];
  const month = +parts[1] - 1; // Month is 0-indexed
  const year = +parts[2];

  // Tạo date với thời gian 00:00:00
  const date = new Date(year, month, day, 0, 0, 0, 0);
  return date.toISOString();
}

/**
 * Parse date string dd/mm/yyyy và set thời gian 00:00:00 của ngày hôm sau
 * @param dateStr - Chuỗi ngày định dạng dd/mm/yyyy
 * @returns ISO string với thời gian 00:00:00 của ngày hôm sau
 */
export function parseDateToEndOfDay(dateStr: string): string | undefined {
  if (!dateStr) return undefined;

  const parts = dateStr.split('/');
  if (parts.length !== 3) return undefined;

  const day = +parts[0];
  const month = +parts[1] - 1;
  const year = +parts[2];

  // Tạo date với thời gian 00:00:00, sau đó cộng thêm 1 ngày
  const date = new Date(year, month, day, 0, 0, 0, 0);
  date.setDate(date.getDate() + 1);
  return date.toISOString();
}

/**
 * Parse chuỗi ngày tháng thành Date.
 * Hỗ trợ các định dạng phổ biến:
 * - dd/MM/yyyy
 * - dd/MM/yyyy HH:mm[:ss]
 * - yyyy-MM-dd
 * - yyyy-MM-dd HH:mm[:ss]
 * - yyyy/MM/dd
 * - dd-MM-yyyy, dd.MM.yyyy
 * - ISO 8601 (chuỗi parse được bởi Date constructor)
 * - timestamp (giây hoặc mili giây)
 * Trả về null nếu không parse được.
 */
export function parseDate(value: any): Date | null {
  if (value === null || value === undefined) return null;

  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : new Date(value);
  }

  if (typeof value === 'number') {
    const ms = value > 1e12 ? value : value * 1000; // 10 hoặc 13 chữ số
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }

  if (typeof value !== 'string') return null;

  const s = value.trim();
  if (!s) return null;

  // timestamp dạng chuỗi
  if (/^\d{10,13}$/.test(s)) {
    const num = parseInt(s, 10);
    const ms = s.length === 13 ? num : num * 1000;
    const d = new Date(ms);
    if (!isNaN(d.getTime())) return d;
  }

  // dd/MM/yyyy[ HH:mm[:ss]]
  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (m) {
    const day = parseInt(m[1], 10);
    const month = parseInt(m[2], 10) - 1;
    const year = parseInt(m[3], 10);
    const hour = m[4] ? parseInt(m[4], 10) : 0;
    const minute = m[5] ? parseInt(m[5], 10) : 0;
    const second = m[6] ? parseInt(m[6], 10) : 0;
    const d = new Date(year, month, day, hour, minute, second, 0);
    if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) return d;
    return null;
  }

  // yyyy[-/]MM[-/]dd[ HH:mm[:ss]]
  m = s.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (m) {
    const year = parseInt(m[1], 10);
    const month = parseInt(m[2], 10) - 1;
    const day = parseInt(m[3], 10);
    const hour = m[4] ? parseInt(m[4], 10) : 0;
    const minute = m[5] ? parseInt(m[5], 10) : 0;
    const second = m[6] ? parseInt(m[6], 10) : 0;
    const d = new Date(year, month, day, hour, minute, second, 0);
    if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) return d;
    return null;
  }

  // dd[-.]MM[-.]yyyy[ HH:mm[:ss]]
  m = s.match(/^(\d{1,2})[-\.](\d{1,2})[-\.](\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (m) {
    const day = parseInt(m[1], 10);
    const month = parseInt(m[2], 10) - 1;
    const year = parseInt(m[3], 10);
    const hour = m[4] ? parseInt(m[4], 10) : 0;
    const minute = m[5] ? parseInt(m[5], 10) : 0;
    const second = m[6] ? parseInt(m[6], 10) : 0;
    const d = new Date(year, month, day, hour, minute, second, 0);
    if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) return d;
    return null;
  }

  // ISO 8601 hoặc các chuỗi parse được bởi Date constructor
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d;

  return null;
}
