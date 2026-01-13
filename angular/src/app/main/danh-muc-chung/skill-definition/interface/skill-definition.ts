import { PagedResultDto } from '@abp/ng.core';
import { SkillDefinitionDto } from '../../../../proxy/dtos/models';

export interface SkillDefinitionRowView {
  id: number;
  name?: string;
  category?: string;
  description?: string;
  displayName?: string;
  displayCategory?: string;
  displayDescription?: string;
}

export function mapSkillDefinitionResponse(
  res?: PagedResultDto<SkillDefinitionDto>
): { data: SkillDefinitionRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: SkillDefinitionRowView[] = items.map((it: any) => {
    const payload = (it?.SkillDefinition ?? it) as SkillDefinitionDto | any;
    const displayName = payload?.name ?? '';
    const displayCategory = payload?.category ?? '';
    const displayDescription = payload?.description ?? '';

    return {
      id: payload?.id ?? it?.id ?? 0,
      name: payload?.name,
      category: payload?.category,
      description: payload?.description,
      displayName,
      displayCategory,
      displayDescription,
    };
  });

  return { data, total };
}

export function buildUpdateDtoFromRow(row: SkillDefinitionRowView): SkillDefinitionDto {
  if (!row) {
    return {} as SkillDefinitionDto;
  }

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
  } as SkillDefinitionDto;
}
