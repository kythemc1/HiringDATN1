import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { RestService } from '@abp/ng.core';
import { IActionResult } from '@proxy/microsoft/asp-net-core/mvc/models';
import { CreateUpdateFileDinhKemDto } from '@proxy/administration/dtos/models';
import { TnpcItem } from './types';

export function triggerInput(inputId: string): void {
  const el = document.getElementById(inputId) as HTMLInputElement | null;
  el?.click();
}

export function onFileSelectForRow(
  event: Event,
  row: TnpcItem,
  deps: {
    disabled: boolean;
    restService: RestService;
    apiName: string;
    cdr: ChangeDetectorRef;
    getDefaultFileUploadConfig: () => {
      allowedExtensions: Set<string>;
      allowedMimeTypes: Set<string>;
    };
    isFileAllowed: (
      file: File,
      allowedExtensions: Set<string>,
      allowedMimeTypes: Set<string>
    ) => boolean;
  }
): void {
  if (deps.disabled) return;
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;
  const files = Array.from(input.files);
  const { allowedExtensions, allowedMimeTypes } = deps.getDefaultFileUploadConfig();
  const validFiles = files.filter(f => deps.isFileAllowed(f, allowedExtensions, allowedMimeTypes));
  const invalids = files.filter(f => !deps.isFileAllowed(f, allowedExtensions, allowedMimeTypes));
  if (invalids.length) console.warn('Một số file không hợp lệ đã bị loại');
  if (!validFiles.length) return;

  const formData = new FormData();
  validFiles.forEach(file => formData.append('fileUploads', file, file.name));

  deps.restService
    .request<any, IActionResult>(
      { method: 'POST', url: '/api/minio/upload-multi-file', body: formData },
      { apiName: deps.apiName }
    )
    .subscribe({
      next: res => {
        const filesRes = (res as any)?.files || [];
        const mapped = filesRes.map((f: any) => ({
          id: f?.id,
          name: f?.tenFile ?? f?.fileName ?? '-',
          url: f?.duongDanFile ?? f?.url ?? undefined,
        }));
        const current = Array.isArray(row.files) ? row.files : [];
        row.files = [...current, ...mapped];
        deps.cdr.markForCheck();
      },
      error: err => console.error('Upload file thất bại', err),
    });
}

export function removeFileFromRow(
  row: TnpcItem,
  index: number,
  deps: { disabled: boolean; cdr: ChangeDetectorRef }
): void {
  if (deps.disabled) return;
  if (!Array.isArray(row.files)) return;
  row.files.splice(index, 1);
  row.files = [...row.files];
  deps.cdr.markForCheck();
}

export function onFileSelectForReply(
  event: Event,
  row: TnpcItem,
  deps: {
    disabled: boolean;
    restService: RestService;
    apiName: string;
    cdr: ChangeDetectorRef;
    showLoading: () => void;
    hideLoading: () => void;
    getDefaultFileUploadConfig: () => {
      allowedExtensions: Set<string>;
      allowedMimeTypes: Set<string>;
    };
    isFileAllowed: (
      file: File,
      allowedExtensions: Set<string>,
      allowedMimeTypes: Set<string>
    ) => boolean;
  }
): void {
  if (deps.disabled) return;
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;
  const files = Array.from(input.files);
  const { allowedExtensions, allowedMimeTypes } = deps.getDefaultFileUploadConfig();
  const validFiles = files.filter(f => deps.isFileAllowed(f, allowedExtensions, allowedMimeTypes));
  if (!validFiles.length) return;
  const formData = new FormData();
  validFiles.forEach(f => formData.append('fileUploads', f, f.name));
  deps.showLoading();
  deps.restService
    .request<any, IActionResult>(
      { method: 'POST', url: '/api/minio/upload-multi-file', body: formData },
      { apiName: deps.apiName }
    )
    .subscribe({
      next: res => {
        deps.hideLoading();
        const filesRes = (res as any)?.files || [];
        const mapped = filesRes.map((f: any) => ({
          id: f?.id,
          name: f?.tenFile ?? f?.fileName ?? '-',
          url: f?.duongDanFile ?? f?.url ?? undefined,
        }));
        const cur = Array.isArray(row.filesReply) ? row.filesReply : [];
        row.filesReply = [...cur, ...mapped];
        deps.cdr.markForCheck();
      },
      error: _ => deps.hideLoading(),
    });
}

export function removeReplyFileFromRow(
  row: TnpcItem,
  index: number,
  deps: { disabled: boolean; cdr: ChangeDetectorRef }
): void {
  if (deps.disabled) return;
  if (!Array.isArray(row.filesReply)) return;
  row.filesReply.splice(index, 1);
  row.filesReply = [...row.filesReply];
  deps.cdr.markForCheck();
}

export function onFileSelectBottomSection(
  event: Event,
  listName: 'toTrinh' | 'congVan' | 'dinhKem' | 'toTrinhHDQT',
  deps: {
    disabled: boolean;
    httpClient: HttpClient;
    url: string;
    cdr: ChangeDetectorRef;
    showLoading: () => void;
    hideLoading: () => void;
    getDefaultFileUploadConfig: () => {
      allowedExtensions: Set<string>;
      allowedMimeTypes: Set<string>;
    };
    isFileAllowed: (
      file: File,
      allowedExtensions: Set<string>,
      allowedMimeTypes: Set<string>
    ) => boolean;
    onSuccess: (mapped: CreateUpdateFileDinhKemDto[], input: HTMLInputElement | null) => void;
    showSuccessMessage: (message: string) => void;
    showErrorMessage: (message: string) => void;
  }
): void {
  if (deps.disabled) return;
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const files = Array.from(input.files);
  const { allowedExtensions, allowedMimeTypes } = deps.getDefaultFileUploadConfig();
  const validFiles = files.filter(f => deps.isFileAllowed(f, allowedExtensions, allowedMimeTypes));
  const invalids = files.filter(f => !deps.isFileAllowed(f, allowedExtensions, allowedMimeTypes));
  if (invalids.length) console.warn('Một số file không hợp lệ đã bị loại');
  if (!validFiles.length) return;

  const formData = new FormData();
  validFiles.forEach(file => {
    formData.append('fileUploads', file, file.name);
  });

  deps.showLoading();

  deps.httpClient
    .post(deps.url, formData)
    .pipe(
      finalize(() => {
        deps.hideLoading();
      })
    )
    .subscribe({
      next: (response: any) => {
        const items = response?.files || response?.items || response || [];
        const mapped: CreateUpdateFileDinhKemDto[] = items.map(
          (item: any) =>
            ({
              id: item.id || 0,
              tenFile: item.fileName || item.tenFile || item.name || '',
              duongDanFile: item.fileUrl || item.duongDanFile || item.url || '',
              kieuFile: item.contentType || item.kieuFile || item.type || '',
              dungLuongFile:
                item.sizeBytes?.toString() || item.dungLuongFile || item.size?.toString() || '0',
              ngayCapNhat: new Date(),
              controlsId: listName,
            } as any)
        );

        deps.onSuccess(mapped, input);
        deps.showSuccessMessage(`Upload thành công ${mapped.length} file`);
        deps.cdr.markForCheck();
      },
      error: err => {
        const msg = err?.error?.message || err?.message || 'Có lỗi xảy ra khi upload file';
        deps.showErrorMessage(msg);
        console.error('Upload file thất bại', err);
        if (input) input.value = '';
      },
    });
}

export function removeBottomFileInLists(
  listName: 'toTrinh' | 'congVan' | 'dinhKem' | 'toTrinhHDQT',
  index: number,
  lists: {
    filesToTrinh: CreateUpdateFileDinhKemDto[];
    filesToTrinhHDQT: CreateUpdateFileDinhKemDto[];
    filesCongVan: CreateUpdateFileDinhKemDto[];
    filesDinhKem: CreateUpdateFileDinhKemDto[];
  },
  deps: { disabled: boolean; cdr: ChangeDetectorRef; recompute: () => void }
): void {
  if (deps.disabled) return;
  if (listName === 'toTrinh') {
    lists.filesToTrinh.splice(index, 1);
    lists.filesToTrinh = [...lists.filesToTrinh];
  } else if (listName === 'toTrinhHDQT') {
    lists.filesToTrinhHDQT.splice(index, 1);
    lists.filesToTrinhHDQT = [...lists.filesToTrinhHDQT];
  } else if (listName === 'congVan') {
    lists.filesCongVan.splice(index, 1);
    lists.filesCongVan = [...lists.filesCongVan];
  } else {
    lists.filesDinhKem.splice(index, 1);
    lists.filesDinhKem = [...lists.filesDinhKem];
  }
  deps.recompute();
  deps.cdr.markForCheck();
}
