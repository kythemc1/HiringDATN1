import { CreateUpdateFileDinhKemDto } from '@proxy/administration/dtos/models';

export type FileDisplay = { id?: string | number; name: string; url?: string };

export function mapFileDtosToDisplay(list: CreateUpdateFileDinhKemDto[] | undefined | null): FileDisplay[] {
  return (list || []).map(f => ({
    id: f.id,
    name: f.tenFile ?? '-',
    url: f.duongDanFile ?? '',
  }));
}
