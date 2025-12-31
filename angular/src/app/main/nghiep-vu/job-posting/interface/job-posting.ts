import { PagedResultDto } from '@abp/ng.core';
import { JobPostingDto } from '../../../../proxy/dtos/models';

export interface JobPostingRowView {
  id: number;
  companyId?: number;
  title?: string;
  jobDescription?: string;
  jobRequirements?: string;
  benefits?: string;
  salaryRange?: string;
  location?: string;
  status?: string | number | boolean | null;
  isAiGenerated?: boolean;
}

export function mapJobPostingResponse(
  res?: PagedResultDto<JobPostingDto>
): { data: JobPostingRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: JobPostingRowView[] = items.map((it: any) => {
    const payload = (it?.JobPosting ?? it?.JobPosting ?? it) as JobPostingDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenJobPosting ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenJobPosting ??
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

export function buildUpdateDtoFromRow(row: JobPostingRowView): JobPostingDto {
  if (!row) {
    return {} as JobPostingDto;
  }

  return {
    id: row.id,
    companyId: row.companyId,
    title: row.title,
    jobDescription: row.jobDescription,
    jobRequirements: row.jobRequirements,
    benefits: row.benefits,
    salaryRange: row.salaryRange,
    location: row.location,
    status: row.status,
    isAiGenerated: row.isAiGenerated,
  } as JobPostingDto;
}
