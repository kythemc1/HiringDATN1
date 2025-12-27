import { PagedResultDto } from '@abp/ng.core';
import { CandidateSkillDto } from '../../../../proxy/dtos/models';
import type { SkillLevel } from '../../../../proxy/dtos/skill-level.enum';

export interface CandidateSkillRowView {
  id: number;
  profileId: number;
  skillDefinitionId: number;
  level?: SkillLevel;
}

export function mapCandidateSkillResponse(
  res?: PagedResultDto<CandidateSkillDto>
): { data: CandidateSkillRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: CandidateSkillRowView[] = items.map((it: any) => {
    const payload = (it?.CandidateSkill ?? it?.CandidateSkill ?? it) as CandidateSkillDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenCandidateSkill ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenCandidateSkill ??
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

export function buildUpdateDtoFromRow(row: CandidateSkillRowView): CandidateSkillDto {
  if (!row) {
    return {} as CandidateSkillDto;
  }

  return {
    id: row.id,
    profileId: row.profileId,
    skillDefinitionId: row.skillDefinitionId,
    level: row.level,
  } as CandidateSkillDto;
}
