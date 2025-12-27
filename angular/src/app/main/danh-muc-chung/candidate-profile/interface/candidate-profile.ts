import { PagedResultDto } from '@abp/ng.core';
import { CandidateProfileDto } from '../../../../proxy/dtos/models';

export interface CandidateProfileRowView {
  id: number;
  userId: number;
  fullName?: string;
  jobTitle?: string;
  aboutMe?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  githubUrl?: string;
  linkedInUrl?: string;
}

export function mapCandidateProfileResponse(
  res?: PagedResultDto<CandidateProfileDto>
): { data: CandidateProfileRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: CandidateProfileRowView[] = items.map((it: any) => {
    const payload = (it?.CandidateProfile ?? it?.CandidateProfile ?? it) as CandidateProfileDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenCandidateProfile ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenCandidateProfile ??
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

export function buildUpdateDtoFromRow(row: CandidateProfileRowView): CandidateProfileDto {
  if (!row) {
    return {} as CandidateProfileDto;
  }

  return {
    id: row.id,
    userId: row.userId,
    fullName: row.fullName,
    jobTitle: row.jobTitle,
    aboutMe: row.aboutMe,
    dateOfBirth: row.dateOfBirth,
    phoneNumber: row.phoneNumber,
    email: row.email,
    address: row.address,
    githubUrl: row.githubUrl,
    linkedInUrl: row.linkedInUrl,
  } as CandidateProfileDto;
}
