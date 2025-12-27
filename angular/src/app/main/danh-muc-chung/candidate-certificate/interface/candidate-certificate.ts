import { PagedResultDto } from '@abp/ng.core';
import { CandidateCertificateDto } from '../../../../proxy/dtos/models';

export interface CandidateCertificateRowView {
  id: number;
  profileId: number;
  name?: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export function mapCandidateCertificateResponse(
  res?: PagedResultDto<CandidateCertificateDto>
): { data: CandidateCertificateRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: CandidateCertificateRowView[] = items.map((it: any) => {
    const payload = (it?.CandidateCertificate ?? it?.CandidateCertificate ?? it) as CandidateCertificateDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenCandidateCertificate ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenCandidateCertificate ??
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

export function buildUpdateDtoFromRow(row: CandidateCertificateRowView): CandidateCertificateDto {
  if (!row) {
    return {} as CandidateCertificateDto;
  }

  return {
    id: row.id,
    profileId: row.profileId,
    name: row.name,
    issuer: row.issuer,
    issueDate: row.issueDate,
    expiryDate: row.expiryDate,
    credentialUrl: row.credentialUrl,
  } as CandidateCertificateDto;
}
