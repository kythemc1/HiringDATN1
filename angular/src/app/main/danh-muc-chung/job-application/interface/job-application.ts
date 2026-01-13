import { PagedResultDto } from '@abp/ng.core';
import { JobApplicationDto } from '../../../../proxy/dtos/models';
import { ApplicationStatus } from 'src/app/proxy/dtos/application-status.enum';

export interface JobApplicationRowView {
  id: number;
  jobId?: number;
  candidateProfileId?: number;
  profileSnapshotJson?: string;
  coverLetter?: string;
  status?: ApplicationStatus;
  aiMatchingScore?: number;
  displayJobId?: string;
  displayCandidateProfileId?: string;
  displayCoverLetter?: string;
  displayStatus?: string;
  displayAiMatchingScore?: string;
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
    const payload = (it?.JobApplication ?? it) as JobApplicationDto | any;
    const displayJobId = payload?.jobId != null ? String(payload.jobId) : '';
    const displayCandidateProfileId = payload?.candidateProfileId != null ? String(payload.candidateProfileId) : '';
    const displayCoverLetter = payload?.coverLetter ? payload.coverLetter.slice(0, 120) : '';
    const displayStatus =
      payload?.status != null ? (ApplicationStatus[payload.status] ?? payload.status?.toString() ?? '') : '';
    const displayAiMatchingScore =
      payload?.aiMatchingScore != null ? `${payload.aiMatchingScore}` : '';

    return {
      id: payload?.id ?? it?.id ?? 0,
      jobId: payload?.jobId,
      candidateProfileId: payload?.candidateProfileId,
      profileSnapshotJson: payload?.profileSnapshotJson,
      coverLetter: payload?.coverLetter,
      status: payload?.status,
      aiMatchingScore: payload?.aiMatchingScore,
      displayJobId,
      displayCandidateProfileId,
      displayCoverLetter,
      displayStatus,
      displayAiMatchingScore,
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
    jobId: row.jobId ?? 0,
    candidateProfileId: row.candidateProfileId ?? 0,
    profileSnapshotJson: row.profileSnapshotJson,
    coverLetter: row.coverLetter,
    status: row.status,
    aiMatchingScore: row.aiMatchingScore,
  } as JobApplicationDto;
}
