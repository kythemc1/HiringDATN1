import { Injectable } from "@angular/core";
import { AiPromptTemplateService } from "../../../../proxy/controllers/ai-prompt-template.service";
import { AiPromptTemplateDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AiPromptTemplateApiService {
    constructor(
     
        private AiPromptTemplateService: AiPromptTemplateService,
    ) { }

    getAiPromptTemplate(input: SearchInputDto): Observable<any> {
        return this.AiPromptTemplateService.search(input);
    }

    deleteAiPromptTemplate(id: number): Observable<any> {
        return this.AiPromptTemplateService.delete(id);
    }

    getDetailById(id: number): Observable<AiPromptTemplateDto> {
        return this.AiPromptTemplateService.getById(id).pipe(
            map((res: any) => res?.AiPromptTemplate as AiPromptTemplateDto)
        );
    }

}
