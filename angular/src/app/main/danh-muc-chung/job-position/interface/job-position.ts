import { PagedResultDto } from '@abp/ng.core';
import { JobPositionDto } from '../../../../proxy/dtos/models';

export interface JobPositionRowView {
  id: number;
  name?: string;
  alias?: string;
  displayName?: string;
  displayAlias?: string;
}

export function mapJobPositionResponse(
  res?: PagedResultDto<JobPositionDto>
): { data: JobPositionRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: JobPositionRowView[] = items.map((it: any) => {
    const payload = (it?.JobPosition ?? it) as JobPositionDto | any;
    const displayName = payload?.name ?? '';
    const displayAlias = payload?.alias ?? '';

    return {
      id: payload?.id ?? it?.id ?? 0,
      name: payload?.name,
      alias: payload?.alias,
      displayName,
      displayAlias,
    };
  });

  return { data, total };
}

export function buildUpdateDtoFromRow(row: JobPositionRowView): JobPositionDto {
  if (!row) {
    return {} as JobPositionDto;
  }

  return {
    id: row.id,
    name: row.name,
    alias: row.alias,
  } as JobPositionDto;
}
