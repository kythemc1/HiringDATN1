import { PagedResultDto } from '@abp/ng.core';
import { JobApplicationDto } from '../../../../proxy/dtos/models';
import { ApplicationStatus } from 'src/app/proxy/dtos/application-status.enum';

export interface JobApplicationRowView {
  id: number;
  profileSnapshotJson?: string;
  coverLetter?: string;
  status?: ApplicationStatus;
  aiMatchingScore?: number;
}

export function mapJobApplicationResponse(
  res?: PagedResultDto<JobApplicationDto>
): { data: JobApplicationRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: JobApplicationRowView[] = items.map((it: any) => {
    const payload = (it?.JobApplication ?? it?.JobApplication ?? it) as JobApplicationDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenJobApplication ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenJobApplication ??
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

export function buildUpdateDtoFromRow(row: JobApplicationRowView): JobApplicationDto {
  if (!row) {
    return {} as JobApplicationDto;
  }

  return {
    id: row.id,
    profileSnapshotJson: row.profileSnapshotJson,
    coverLetter: row.coverLetter,
    status: row.status,
    aiMatchingScore: row.aiMatchingScore,
  } as unknown as JobApplicationDto;
}
