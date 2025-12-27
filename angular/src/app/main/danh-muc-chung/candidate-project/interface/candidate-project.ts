import { PagedResultDto } from '@abp/ng.core';
import { CandidateProjectDto } from '../../../../proxy/dtos/models';

export interface CandidateProjectRowView {
  id: number;
  profileId: number;
  name?: string;
  linkUrl?: string;
  description?: string;
  technologies?: string;
  teamSize: number;
  role?: string;
}

export function mapCandidateProjectResponse(
  res?: PagedResultDto<CandidateProjectDto>
): { data: CandidateProjectRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: CandidateProjectRowView[] = items.map((it: any) => {
    const payload = (it?.CandidateProject ?? it?.CandidateProject ?? it) as CandidateProjectDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenCandidateProject ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenCandidateProject ??
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

export function buildUpdateDtoFromRow(row: CandidateProjectRowView): CandidateProjectDto {
  if (!row) {
    return {} as CandidateProjectDto;
  }

  return {
    id: row.id,
    profileId: row.profileId,
    name: row.name,
    linkUrl: row.linkUrl,
    description: row.description,
    technologies: row.technologies,
    teamSize: row.teamSize,
    role: row.role,
  } as CandidateProjectDto;
}
