import { PagedResultDto } from '@abp/ng.core';
import { CompanyDto } from '../../../../proxy/dtos/models';

export interface CompanyRowView {
  id: number;
  name?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  address?: string;
  displayName?: string;
  displayDescription?: string;
  displayWebsite?: string;
  displayAddress?: string;
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
    const payload = (it?.Company ?? it) as CompanyDto | any;
    const displayName = payload?.name ?? '';
    const displayDescription = payload?.description ?? '';
    const displayWebsite = payload?.website ?? '';
    const displayAddress = payload?.address ?? '';

    return {
      id: payload?.id ?? it?.id ?? 0,
      name: payload?.name,
      description: payload?.description,
      website: payload?.website,
      logoUrl: payload?.logoUrl,
      address: payload?.address,
      displayName,
      displayDescription,
      displayWebsite,
      displayAddress,
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
