// import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
// import { BaoCaoService } from '@proxy/administration/services';
// import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

// export function emailValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const value: string = control.value?.trim();
//     if (!value) return null;

//     // Regex yêu cầu định dạng: ít nhất một ký tự trước @, sau @ phải có domain với ít nhất một dấu chấm
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(value)) {
//       return { email: true };
//     }

//     return null;
//   };
// }

// export function taxCodeExactLengthValidator(expectedLength: number): ValidatorFn {
//   return (control: AbstractControl) => {
//     const raw = control.value as string;
//     if (raw === undefined || raw === null || raw === '') {
//       return null;
//     }
//     const value = raw.toString().trim();
//     if (value.length === 0) {
//       return { taxCodeExactLength: { requiredLength: expectedLength, actualLength: 0 } };
//     }
//     return value.length === expectedLength
//       ? null
//       : { taxCodeExactLength: { requiredLength: expectedLength, actualLength: value.length } };
//   };
// }

// export function phoneNumberValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;

//     if (!value) {
//       return null;
//     }

//     const trimmedValue = value.toString().trim();
//     const phoneRegex = /^(?:\+84|0)(3|5|7|8|9)[0-9]{8}$/;

//     // Kiểm tra độ dài
//     // if (trimmedValue.startsWith('+84')) {
//     //   if (trimmedValue.length !== 12) {
//     //     return { phoneInterLengthInValid: true };
//     //   }
//     // } else if (trimmedValue.startsWith('0')) {
//     //   if (trimmedValue.length !== 10) {
//     //     return { phoneLocalLengthInValid: true };
//     //   }
//     // }

//     if (!phoneRegex.test(trimmedValue)) {
//       return { phoneNumberInvalid: true };
//     }

//     return null;
//   };
// }

// export function citizenIdValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;

//     if (!value) {
//       return null;
//     }

//     const trimmedValue = value.toString().trim();

//     const cccdRegex = /^[0-9]{12}$/;

//     if (!cccdRegex.test(trimmedValue)) {
//       return { citizenIdInvalid: true };
//     }

//     return null;
//   };
// }

// // Validate mã chỉ chứa chữ, số, gạch ngang, gạch dưới
// export function codeValidator(): ValidatorFn {
//   return (control): ValidationErrors | null => {
//     const value = control.value;
//     if (!value) {
//       return null;
//     }
//     // Cho phép chữ, số, gạch ngang (-), gạch dưới (_)
//     const pattern = /^[A-Za-z0-9_-]+$/;
//     if (!pattern.test(value)) {
//       return { invalidCodeSpecialChar: true };
//     }

//     return null;
//   };
// }

// // Validate không có khoảng trắng ở đầu hoặc cuối
// export function noLeadingTrailingSpaceValidator(): ValidatorFn {
//   return (control): ValidationErrors | null => {
//     const value = control.value;
//     if (!value) {
//       return null;
//     }

//     // Kiểm tra nếu chỉ toàn khoảng trắng
//     if (typeof value === 'string' && value.trim().length === 0) {
//       return { whitespace: true };
//     }

//     return null;
//   };
// }

// export function soVanBanExistsValidator(
//   service: BaoCaoService,
//   getId: () => number | null,
//   getDonViId: () => number | null,
//   getOriginalValue: () => string | null
// ): AsyncValidatorFn {
//   return (control: AbstractControl) => {
//     const value = control.value;
//     const id = getId();
//     const donViId = getDonViId();
//     const originalValue = getOriginalValue();

//     // Không đủ dữ liệu
//     if (!value || !donViId) {
//       return of(null);
//     }

//     // 👉 EDIT MODE + CHƯA ĐỔI GIÁ TRỊ → KHÔNG VALIDATE
//     if (id && value === originalValue) {
//       return of(null);
//     }

//     return service.exist(id, value, donViId).pipe(
//       map(exists => (exists ? { soVanBanExists: true } : null)),
//       catchError(() => of(null))
//     );
//   };
// }

// // export function ipValidator(): ValidatorFn {
// //   return (control: AbstractControl): ValidationErrors | null => {
// //     if (!control.value) return null;

// //     const value = control.value.trim();
// //     const valid = isIP(value, 4) || isIP(value, 6);

// //     return valid ? null : { invalidIp: true };
// //   };
// // }

// // export function dnsValidator(): ValidatorFn {
// //   return (control: AbstractControl): ValidationErrors | null => {
// //     if (!control.value) return null;

// //     const value = control.value.trim();
// //     // Regex domain name
// //     const domainRegex =
// //       /^(?=.{1,253}$)(?!-)([a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$/;

// //     if (isIP(value, 4) || isIP(value, 6) || domainRegex.test(value)) {
// //       return null;
// //     }

// //     return { invalidDns: true };
// //   };
// // }
