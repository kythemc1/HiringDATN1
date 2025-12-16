import { TnpcItem } from './types';

export type AttachmentDisplay = { id?: string | number; name: string; url?: string };

export function isFileAllowed(
  file: File,
  allowedExtensions: Set<string>,
  allowedMimeTypes: Set<string>
): boolean {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  return allowedExtensions.has(ext) || allowedMimeTypes.has(file.type);
}

export function getDefaultFileUploadConfig() {
  return {
    acceptedTypes: '.csv,.xlsx,.docx,.pdf,.doc',
    allowedExtensions: new Set(['csv', 'xlsx', 'docx', 'pdf', 'doc']),
    allowedMimeTypes: new Set([
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'application/msword',
    ]),
  } as const;
}

export function parseDateToVN(dateStr: string): string {
  const date = new Date(dateStr);
  const vnDate = new Date(date.getTime() - 7 * 3600 * 1000);
  const pad = (n: number) => (n < 10 ? '0' + n : n);
  return (
    `${pad(vnDate.getHours())}:` +
    `${pad(vnDate.getMinutes())}:` +
    `${pad(vnDate.getSeconds())} ` +
    `${pad(vnDate.getDate())}/` +
    `${pad(vnDate.getMonth() + 1)}/` +
    `${vnDate.getFullYear()}`
  );
}

export function getGroupLabel(row: { parentIsXuLy?: boolean } | null | undefined): string {
  if (!row) return '';
  return row.parentIsXuLy === false ? 'Phối hợp' : 'Xử lý';
}
