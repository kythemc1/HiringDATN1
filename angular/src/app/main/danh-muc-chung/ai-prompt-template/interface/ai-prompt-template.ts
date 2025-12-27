import { PagedResultDto } from '@abp/ng.core';
import { AiPromptTemplateDto } from '../../../../proxy/dtos/models';

export interface AiPromptTemplateRowView {
  id: number;
  providerName?: string;
  modelName?: string;
  apiKey?: string;
  baseUrl?: string;
  isActive?: boolean;
  creationTime?: string | Date | null;
  lastModificationTime?: string | Date | null;
  ma?: string;
  ten?: string;
  moTa?: string;
  trangThai?: string | number | null;
  displayProvider?: string;
  displayModel?: string;
  displayDescription?: string;
  displayStatus?: string | number | boolean | null;
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
    const payload = (it?.AiPromptTemplate ?? it?.AiPromptTemplate ?? it) as AiPromptTemplateDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenAiPromptTemplate ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenAiPromptTemplate ??
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

export function buildUpdateDtoFromRow(row: AiPromptTemplateRowView): AiPromptTemplateDto {
  if (!row) {
    return {} as AiPromptTemplateDto;
  }

  return {
    id: row.id,
    providerName: row.providerName,
    modelName: row.modelName,
    apiKey: row.apiKey,
    baseUrl: row.baseUrl,
    isActive: row.isActive,
    creationTime: row.creationTime,
    lastModificationTime: row.lastModificationTime,
  } as AiPromptTemplateDto;
}
