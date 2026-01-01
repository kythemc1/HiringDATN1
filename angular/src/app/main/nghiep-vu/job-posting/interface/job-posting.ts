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
    const payload = (it?.jobPosting ?? it?.JobPosting ?? it) as JobPostingDto | any;

    return {
      id: payload?.id ?? it?.id ?? 0,
      companyId: payload?.companyId ?? null,
      title: payload?.title ?? '',
      jobDescription: payload?.jobDescription ?? '',
      jobRequirements: payload?.jobRequirements ?? '',
      benefits: payload?.benefits ?? '',
      salaryRange: payload?.salaryRange ?? '',
      location: payload?.location ?? '',
      status: payload?.status ?? null,
      isAiGenerated: payload?.isAiGenerated ?? false,
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
