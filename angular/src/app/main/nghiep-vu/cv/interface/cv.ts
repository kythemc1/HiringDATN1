import { PagedResultDto } from '@abp/ng.core';
import {  CandidateExperienceDto, CandidateEducationDto, CandidateProjectDto, CandidateCertificateDto, CandidateSkillDto, CVDto, CandidateProfileDto } from '../../../../proxy/dtos/models';

export interface CvRowView {
  profile?: CandidateProfileDto;
  experiences?: CandidateExperienceDto[];
  educations?: CandidateEducationDto[];
  projects?: CandidateProjectDto[];
  certificates?: CandidateCertificateDto[];
  skills?: CandidateSkillDto[];
}

export function mapCvResponse(
  res?: PagedResultDto<CVDto>
): { items: CvRowView[]; totalCount: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const totalCount =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const itemsData =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const items: CvRowView[] = itemsData.map((it: any) => {
    const payload = (it?.CVDto ?? it?.CVDto ?? it) as CVDto | any;

    const displayProvider =
      payload?.displayName ??
      '';

    return {
      profile: payload?.candidateProfileDto,
      experiences: payload?.candidateExperienceDtos,
      educations: payload?.candidateEducationDtos ?? [],
      projects: payload?.candidateProjectDtos ?? [],
      certificates: payload?.candidateCertificateDtos ?? [],
      skills: payload?.candidateSkillDtos ?? [],
    };
  });

  return { items, totalCount };
}

export function buildUpdateDtoFromRow(row: CvRowView): CVDto {
  if (!row) {
    return {} as CVDto;
  }

  return {
    candidateProfileDto: {
      id: row.profile?.id,
      userId: row.profile?.userId,
      fullName: row.profile?.fullName,
      jobTitle: row.profile?.jobTitle,
      aboutMe: row.profile?.aboutMe,
      dateOfBirth: row.profile?.dateOfBirth,
      phoneNumber: row.profile?.phoneNumber,
      email: row.profile?.email,
      address: row.profile?.address,
      githubUrl: row.profile?.githubUrl,
      linkedInUrl: row.profile?.linkedInUrl,
    } as CandidateProfileDto,
    candidateExperienceDtos: [],
    candidateEducationDtos: [],
    candidateCertificateDtos: [],
    candidateSkillDtos: [],
  } as CVDto;
}
