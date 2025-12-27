import { PagedResultDto } from '@abp/ng.core';
import { AgentThinkingLogDto } from '../../../../proxy/dtos/models';

export interface AgentThinkingLogRowView {
  id: number;
  messageId: number;
  agentName?: string;
  stepName?: string;
  inputData?: string;
  outputData?: string;
  durationMs: number;
}

export function mapAgentThinkingLogResponse(
  res?: PagedResultDto<AgentThinkingLogDto>
): { data: AgentThinkingLogRowView[]; total: number } {
  const paged = res ?? ((res as any)?.result ?? res);
  const total =
    paged?.totalCount ?? (paged?.result ? paged?.result?.totalCount : undefined) ?? 0;

  const items =
    Array.isArray(paged?.items) ? paged.items :
    Array.isArray((paged as any)?.result?.items) ? (paged as any).result.items :
    [];

  const data: AgentThinkingLogRowView[] = items.map((it: any) => {
    const payload = (it?.AgentThinkingLog ?? it?.AgentThinkingLog ?? it) as AgentThinkingLogDto | any;

    const displayProvider =
      payload?.providerName ??
      payload?.tenAgentThinkingLog ??
      payload?.provider ??
      payload?.ten ??
      payload?.ma ??
      '';
    const displayModel =
      payload?.modelName ??
      payload?.tenAgentThinkingLog ??
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

export function buildUpdateDtoFromRow(row: AgentThinkingLogRowView): AgentThinkingLogDto {
  if (!row) {
    return {} as AgentThinkingLogDto;
  }

  return {
    id: row.id,
    messageId: row.messageId,
    agentName: row.agentName,
    stepName: row.stepName,
    inputData: row.inputData,
    outputData: row.outputData,
    durationMs: row.durationMs,
  } as AgentThinkingLogDto;
}
