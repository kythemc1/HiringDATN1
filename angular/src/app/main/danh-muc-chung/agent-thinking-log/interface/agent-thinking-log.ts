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
    const payload = (it?.AgentThinkingLog ?? it) as AgentThinkingLogDto;

    return {
      id: payload?.id ?? it?.id ?? 0,
      messageId: payload?.messageId ?? 0,
      agentName: payload?.agentName,
      stepName: payload?.stepName,
      inputData: payload?.inputData,
      outputData: payload?.outputData,
      durationMs: payload?.durationMs ?? 0,
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
  };
}
