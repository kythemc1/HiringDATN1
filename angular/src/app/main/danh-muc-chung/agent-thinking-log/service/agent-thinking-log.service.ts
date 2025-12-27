import { Injectable } from "@angular/core";
import { AgentThinkingLogService } from "../../../../proxy/controllers/agent-thinking-log.service";
import { AgentThinkingLogDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AgentThinkingLogApiService {
    constructor(
     
        private AgentThinkingLogService: AgentThinkingLogService,
    ) { }

    getAgentThinkingLog(input: SearchInputDto): Observable<any> {
        return this.AgentThinkingLogService.search(input);
    }

    deleteAgentThinkingLog(id: number): Observable<any> {
        return this.AgentThinkingLogService.delete(id);
    }

    getDetailById(id: number): Observable<AgentThinkingLogDto> {
        return this.AgentThinkingLogService.getById(id).pipe(
            map((res: any) => res?.AgentThinkingLog as AgentThinkingLogDto)
        );
    }

}
