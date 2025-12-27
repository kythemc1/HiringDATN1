import { PagedResultDto } from '@abp/ng.core';
import { CandidateEducationDto } from '../../../../proxy/dtos/models';

export interface CandidateEducationRowView {
  id: number;
  profileId: number;
  schoolName?: string;
  degree?: string;
  major?: string;
  startDate?: string;
  endDate?: string;
  gpa?: number;
  description?: string;
}

export function mapCandidateEducationResponse(
  res?: PagedResultDto<CandidateEducationDto>
): { data: CandidateEducationRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: CandidateEducationRowView[] = items.map((it: any) => {
    const payload = (it?.CandidateEducation ?? it?.CandidateEducation ?? it) as CandidateEducationDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenCandidateEducation ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenCandidateEducation ??
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

export function buildUpdateDtoFromRow(row: CandidateEducationRowView): CandidateEducationDto {
  if (!row) {
    return {} as CandidateEducationDto;
  }

  return {
    id: row.id,
    profileId: row.profileId,
    degree: row.degree,
    major: row.major,
    startDate: row.startDate,
    endDate: row.endDate,
    gpa: row.gpa,
    description: row.description,
  } as CandidateEducationDto;
}
