import { PagedResultDto } from '@abp/ng.core';
import { AiPromptTemplateDto } from '../../../../proxy/dtos/models';

export interface AiPromptTemplateRowView {
  id: number;
  code?: string;
  templateContent?: string;
  description?: string;
  modelConfigId?: string;
  temperature?: number;
  creationTime?: string | Date | null;
  lastModificationTime?: string | Date | null;
  displayCode?: string;
  displayDescription?: string;
  displayTemperature?: string;
  displayModelConfigId?: string;
}

export function mapAiPromptTemplateResponse(
  res?: PagedResultDto<AiPromptTemplateDto>
): { data: AiPromptTemplateRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: AiPromptTemplateRowView[] = items.map((it: any) => {
    const payload = (it?.AiPromptTemplate ?? it) as AiPromptTemplateDto | any;

    const displayCode = payload?.code ?? '';
    const displayDescription = payload?.description ?? '';
    const displayTemperature =
      payload?.temperature != null ? String(payload.temperature) : '';

    return {
      id: payload?.id ?? it?.id ?? 0,
      code: payload?.code,
      templateContent: payload?.templateContent,
      description: payload?.description,
      modelConfigId: payload?.modelConfigId,
      temperature: payload?.temperature,
      creationTime: payload?.creationTime,
      lastModificationTime: payload?.lastModificationTime,
      displayCode,
      displayDescription,
      displayTemperature,
      displayModelConfigId: payload?.modelConfigId,
    };
  });

  return { data, total };
}

export function buildUpdateDtoFromRow(row: AiPromptTemplateRowView): AiPromptTemplateDto {
  if (!row) {
    return {} as AiPromptTemplateDto;
  }

  return {
    id: row.id,
    code: row.code,
    templateContent: row.templateContent,
    description: row.description,
    modelConfigId: row.modelConfigId,
    temperature: row.temperature,
    creationTime: row.creationTime,
    lastModificationTime: row.lastModificationTime,
  } as AiPromptTemplateDto;
}
