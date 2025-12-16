import { Injectable } from "@angular/core";
import { AiModelConfigService } from "../../../../proxy/controllers/ai-model-config.service";
import { AiModelConfigDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AiModelConfigApiService {
    constructor(
     
        private AiModelConfigService: AiModelConfigService,
    ) { }

    getAiModelConfig(input: SearchInputDto): Observable<any> {
        return this.AiModelConfigService.search(input);
    }

    deleteAiModelConfig(id: number): Observable<any> {
        return this.AiModelConfigService.delete(id);
    }

    getDetailById(id: number): Observable<AiModelConfigDto> {
        return this.AiModelConfigService.getById(id).pipe(
            map((res: any) => res?.aiModelConfig as AiModelConfigDto)
        );
    }

}
