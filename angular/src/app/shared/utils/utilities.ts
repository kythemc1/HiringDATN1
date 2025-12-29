
// import { TrangThai, RoleStatus, TrangThaiBieuMau } from '@proxy/administration/utilities';
// import { filter as _filter, forEach as _forEach } from 'lodash';
// import { TreeNode } from 'primeng/api';

// import { FileDto } from '@proxy/administration/dtos';
// import { trangThaiOptions } from './consts';

// export function uuidv4(): string {
//   function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   }
//   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
// }

// export function getTrangThaiLabel(value: TrangThai | number | null | undefined): string {
//   const opt = trangThaiOptions.find(o => o.value === value);
//   return opt ? opt.key : '';
// }

// // Common status display helper for forms
// export type StatusKind = 'boolean' | 'TrangThai' | 'RoleStatus'| 'TrangThaiBieuMau';
// export type StatusDisplay = {
//   label: string;
//   severity: string; 
// };

// // Theme map (customizable)
// export const STATUS_SEVERITY_THEME: {
//   boolean: { true: string; false: string };
//   RoleStatus: { [key: number]: string };
//   TrangThaiBieuMau: { [key: number]: string };
//   TrangThai: { [key: number]: string };
// } = {
//   boolean: { true: 'success', false: 'secondary' },
//   RoleStatus: { 1: 'success', 0: 'danger' },
//   TrangThaiBieuMau: { 1: 'success', 2: 'danger', 3: 'custom-draft' },
//   TrangThai: { 1: 'custom-success', 2: 'custom-danger' },
// };

// // Optional: runtime
// export function setStatusSeverityTheme(
//   kind: keyof typeof STATUS_SEVERITY_THEME,
//   mapping: { [key: string]: string }
// ) {
//   if (!kind || !mapping) return;
//   const target = (STATUS_SEVERITY_THEME as any)[kind];
//   if (target) {
//     Object.assign(target, mapping);
//   }
// }

// export function getStatusDisplay(value: boolean | number | TrangThai | RoleStatus | null | undefined, kind?: StatusKind): StatusDisplay {
//   if (value === null || value === undefined) return { label: '-', severity: '' };

//   const resolvedKind: StatusKind = kind ?? (typeof value === 'boolean' ? 'boolean' : 'TrangThai');

//   switch (resolvedKind) {
//     case 'boolean': {
//       if (value) {
//         const sev = STATUS_SEVERITY_THEME.boolean['true'] || 'success';
//         return { label: 'Hoạt động', severity: sev };
//       } else {
//         const sev = STATUS_SEVERITY_THEME.boolean['false'] || 'secondary';
//         return { label: 'Vô hiệu hoá', severity: sev };
//       }
//     }
//     case 'RoleStatus': {
//       // RoleStatus: HieuLuc (1), HetHieuLuc (0)
//       const isHieuLuc = value === (RoleStatus as any).HieuLuc;
//       const sev = STATUS_SEVERITY_THEME.RoleStatus[isHieuLuc ? 1 : 0] || (isHieuLuc ? 'success' : 'danger');
//       return isHieuLuc
//         ? { label: 'Hiệu lực', severity: sev }
//         : { label: 'Hết hiệu lực', severity: sev };
//     }
//     case 'TrangThaiBieuMau': {
//       // TrangThaiBieuMau: DangHieuLuc (1), HetHieuLuc (2), SoanThao (3)
//       const v = Number(value);
//       if (v === (TrangThaiBieuMau as any).DangHieuLuc) {
//         return { label: 'Hiệu lực', severity: STATUS_SEVERITY_THEME.TrangThaiBieuMau[1]};
//       }
//       if (v === (TrangThaiBieuMau as any).HetHieuLuc) {
//         return { label: 'Hết hiệu lực', severity: STATUS_SEVERITY_THEME.TrangThaiBieuMau[2]};
//       }
//       return { label: 'Soạn thảo', severity: STATUS_SEVERITY_THEME.TrangThaiBieuMau[3] };
//     }
//     case 'TrangThai':
//     default: {
//       // TrangThai: HoatDong (1), KhongHoatDong (2)
//       const isActive = value === (TrangThai as any).HoatDong;
//       const sev = STATUS_SEVERITY_THEME.TrangThai[isActive ? 1 : 2] || (isActive ? 'success' : 'danger');
//       return isActive
//         ? { label: 'Hoạt động', severity: STATUS_SEVERITY_THEME.TrangThai[1] }
//         : { label: 'Không hoạt động', severity: STATUS_SEVERITY_THEME.TrangThai[2] }
//     }
//   }
// }

// export function getSeverityByStatus(value: boolean | number | TrangThai | RoleStatus | null | undefined, kind?: StatusKind): string {
//   return getStatusDisplay(value, kind).severity;
// }

// export function getStatusLabel(value: boolean | number | TrangThai | RoleStatus | null | undefined, kind?: StatusKind): string {
//   return getStatusDisplay(value, kind).label;
// }

// export function formatThousandsNumber(value: number, locale: string = 'en-US'): string {
//   return new Intl.NumberFormat(locale).format(value);
// }

// export function formatCompactNumber(value: number): string {
//   if (value >= 1000000000) {
//     return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'T';
//   }
//   if (value >= 1000000) {
//     return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'Tr';
//   }
//   if (value >= 1000) {
//     return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
//   }
//   return value.toString();
// }


//   function startOfDay(d: Date): Date {
//   const x = new Date(d);
//   x.setHours(0, 0, 0, 0);
//   return x;
// }

// export function parseNgayDuKienDaiHoi(src: Date | string | null | undefined): Date | null {
//   if (!src) return null;
//   if (src instanceof Date) return startOfDay(src);
//   // try parse dd/MM/yyyy or ISO
//   const iso = new Date(src);
//   if (!isNaN(iso.getTime())) return startOfDay(iso);
//   // dd/MM/yyyy
//   const m = String(src).match(/^(\d{2})\/(\d{2})\/(\d{4})/);
//   if (m) {
//     const [_, dd, mm, yyyy] = m as unknown as string[];
//     const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
//     return startOfDay(d);
//   }
//   return null;
// }

// export function formatSize(bytes: number): string {
//   if (!bytes) return '0 KB';
//   const k = 1024,
//     dm = 2,
//     sizes = ['B', 'KB', 'MB', 'GB', 'TB'],
//     i = Math.floor(Math.log(bytes) / Math.log(k));
//   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
// };
// export function getFileUrl(path: string): string {
//   if (!path) return '';
//   // if path already starts with http or https, return as-is
//   if (/^https?:\/\//i.test(path)) return path;
//   // else prefix with API base or minio base if available
//   try {
//     const base = this.environment.getApiUrl('default') || '';
//     return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
//   } catch {
//     return path;
//   }
// }

// export function formatDateStr(dateStr: string): string {
//   const [d, m, y] = dateStr.split('/');
//   return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
// }

// export function calcTableHeight(filterHeight: number, showFilter: boolean): string {
//   const appHeaderHeight = 64;
//   const pageHeaderHeight = 48; // 4rem
//   const commonFilterHeight = 12 + 44 + 48;
//   const advancedFilterHeight = showFilter ? filterHeight : 0;
//   const paginatorHeight = 42; // 3.5rem
//   return `calc(100vh - ${appHeaderHeight + pageHeaderHeight + commonFilterHeight + advancedFilterHeight + paginatorHeight}px)`;
// }

// export function createTree(
//   array: any[],
//   parentIdProperty,
//   idProperty,
//   parentIdValue,
//   childrenProperty: string,
//   fieldMappings
// ): any {
//   let tree = [];

//   let nodes = _filter(array, [parentIdProperty, parentIdValue]);

//   _forEach(nodes, (node) => {
//     let newNode = {
//       data: node,
//     };

//     this.mapFields(node, newNode, fieldMappings);

//     newNode[childrenProperty] = this.createTree(
//       array,
//       parentIdProperty,
//       idProperty,
//       node[idProperty],
//       childrenProperty,
//       fieldMappings
//     );

//     tree.push(newNode);
//   });

//   return tree;
// }

// export function mapFields(node, newNode, fieldMappings): void {
//   _forEach(fieldMappings, (fieldMapping) => {
//     if (!fieldMapping['target']) {
//       return;
//     }

//     if (fieldMapping.hasOwnProperty('value')) {
//       newNode[fieldMapping['target']] = fieldMapping['value'];
//     } else if (fieldMapping['source']) {
//       newNode[fieldMapping['target']] = node[fieldMapping['source']];
//     } else if (fieldMapping['targetFunction']) {
//       newNode[fieldMapping['target']] = fieldMapping['targetFunction'](node);
//     }
//   });
// }

// export function downloadTempFile(environment, file: FileDto) {
//   const url =
//     environment.getApiUrl('default') +
//     '/api/common/file/download-temp-file?fileType=' +
//     file.fileType +
//     '&fileToken=' +
//     file.fileToken +
//     '&fileName=' +
//     file.fileName;
//   location.href = url; //TODO: This causes reloading of same page in Firefox
// }

// export function blobToDataURL(blob: Blob): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const r = new FileReader();
//     r.onload = () => resolve(r.result as string);
//     r.onerror = reject;
//     r.readAsDataURL(blob);
//   });
// }

// export function base64ToUint8Array(base64: string): Uint8Array {
//   const raw = atob(base64);
//   const uint8Array = new Uint8Array(raw.length);
//   for (let i = 0; i < raw.length; i++) {
//     uint8Array[i] = raw.charCodeAt(i);
//   }
//   return uint8Array;
// }


// export function base64ToFile(base64: string, fileName: string): File {
//   const arr = base64.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   const n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   for (let i = 0; i < n; i++) {
//     u8arr[i] = bstr.charCodeAt(i);
//   }
//   return new File([u8arr], fileName, { type: mime });
// }

// export function appendSuffixToFileName(fileName: string, suffix: string): string {
//   const dotIndex = fileName.lastIndexOf('.');
//   if (dotIndex === -1) return fileName + suffix; // no extension
//   const name = fileName.substring(0, dotIndex);
//   const ext = fileName.substring(dotIndex);
//   return `${name}${suffix}${ext}`;
// }

// //#region Allowed file types for upload: Excel, Word, PDF
// export const ALLOWED_UPLOAD_EXTENSIONS: string[] = [
//   'pdf',
//   'doc', 'docx',
//   'xls', 'xlsx'
// ];

// export const ALLOWED_UPLOAD_MIME_TYPES: string[] = [
//   'application/pdf',
//   'application/msword',
//   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//   'application/vnd.ms-excel',
//   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
// ];

// function _normalizeExt(ext: string): string {
//   if (!ext) return '';
//   const clean = ext.trim().replace(/^\./, '').toLowerCase();
//   return clean;
// }

// function _getExtFromName(name?: string): string {
//   if (!name) return '';
//   const idx = name.lastIndexOf('.');
//   return idx >= 0 ? _normalizeExt(name.substring(idx + 1)) : '';
// }

// export function isAllowedUploadFileName(fileName: string): boolean {
//   const ext = _getExtFromName(fileName);
//   return !!ext && ALLOWED_UPLOAD_EXTENSIONS.includes(ext);
// }

// export function isAllowedUploadMimeType(mimeType?: string): boolean {
//   if (!mimeType) return false;
//   const m = mimeType.toLowerCase();
//   return ALLOWED_UPLOAD_MIME_TYPES.includes(m);
// }

// export function isAllowedUploadFile(file: File | { name: string; type?: string }): boolean {
//   if (!file) return false;
//   // Prefer MIME type check if present; otherwise fall back to extension
//   const byMime = !!(file as any).type && isAllowedUploadMimeType((file as any).type);
//   if (byMime) return true;
//   return isAllowedUploadFileName((file as any).name);
// }

// export function allowedUploadAccept(): string {
//   // For input[type=file] accept attribute
//   return ALLOWED_UPLOAD_EXTENSIONS.map(ext => `.${ext}`).join(',');
// }

//   // #endregion

// export function mapTreeNodes(items: any[]): TreeNode[] {
//   return items.map((d, idx) => ({
//     data: { ...(d), __index: idx },
//     children: [
//       { data: { ...(d), __index: idx }, type: 'detail' } as any
//     ]
//   }));
// }


// export function formatDuongDanToChuc(duongDanToChuc: any): string {
//   if (!duongDanToChuc) {
//     return '-';
//   }
  
//   // Nếu là mảng
//   if (Array.isArray(duongDanToChuc)) {
//     return duongDanToChuc.join('; ');
//   }
  
//   // Nếu là chuỗi JSON
//   if (typeof duongDanToChuc === 'string') {
//     try {
//       const parsed = JSON.parse(duongDanToChuc);
//       if (Array.isArray(parsed)) {
//         return parsed.join('; ');
//       }
//     } catch (e) {
//       // Nếu không parse được JSON, trả về chuỗi gốc
//       return duongDanToChuc;
//     }
//   }
  
//   return duongDanToChuc.toString();
// }
