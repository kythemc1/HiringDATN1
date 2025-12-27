import { PagedResultDto } from '@abp/ng.core';
import { CompanyDto } from '../../../../proxy/dtos/models';

export interface CompanyRowView {
  id: number;
  name?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  address?: string;
}

export function mapCompanyResponse(
  res?: PagedResultDto<CompanyDto>
): { data: CompanyRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: CompanyRowView[] = items.map((it: any) => {
    const payload = (it?.Company ?? it?.Company ?? it) as CompanyDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenCompany ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenCompany ??
      payload?.name ??
      payload?.ten ??
      '';
    const displayDescription = payload?.description ?? payload?.moTa ?? '';
    const statusValue =
      payload?.isActive ??
      (payload?.trangThai != null ? (payload.trangThai === '1' || payload.trangThai === 1 || payload.trangThai === true) : null);

    return {
      id: payload?.id ?? it?.id ?? 0,
      providerName: payload?.providerName,
      modelName: payload?.modelName,
      apiKey: payload?.apiKey,
      baseUrl: payload?.baseUrl,
      isActive: payload?.isActive,
      creationTime: payload?.creationTime,
      lastModificationTime: payload?.lastModificationTime,
      ma: payload?.ma,
      ten: payload?.ten,
      moTa: payload?.moTa,
      trangThai: payload?.trangThai,
      displayProvider,
      displayModel,
      displayDescription,
      displayStatus: statusValue,
    };
  });

  return { data, total };
}

export function buildUpdateDtoFromRow(row: CompanyRowView): CompanyDto {
  if (!row) {
    return {} as CompanyDto;
  }

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    website: row.website,
    logoUrl: row.logoUrl,
    address: row.address,
  } as CompanyDto;
}
