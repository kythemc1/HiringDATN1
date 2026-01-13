import { PagedResultDto } from '@abp/ng.core';
import { CertificateDefinitionDto } from '../../../../proxy/dtos/models';

export interface CertificateDefinitionRowView {
  id: number;
  name?: string;
  issuer?: string;
  creationTime?: string | Date | null;
  lastModificationTime?: string | Date | null;
  displayName?: string;
  displayIssuer?: string;
}

export function mapCertificateDefinitionResponse(
  res?: PagedResultDto<CertificateDefinitionDto>
): { data: CertificateDefinitionRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: CertificateDefinitionRowView[] = items.map((it: any) => {
    const payload = (it?.CertificateDefinition ?? it) as CertificateDefinitionDto | any;
    const displayName = payload?.name ?? '';
    const displayIssuer = payload?.issuer ?? '';

    return {
      id: payload?.id ?? it?.id ?? 0,
      name: payload?.name,
      issuer: payload?.issuer,
      creationTime: payload?.creationTime,
      lastModificationTime: payload?.lastModificationTime,
      displayName,
      displayIssuer,
    };
  });

  return { data, total };
}

export function buildUpdateDtoFromRow(row: CertificateDefinitionRowView): CertificateDefinitionDto {
  if (!row) {
    return {} as CertificateDefinitionDto;
  }

  return {
    id: row.id,
    name: row.name,
    issuer: row.issuer,
  } as CertificateDefinitionDto;
}
