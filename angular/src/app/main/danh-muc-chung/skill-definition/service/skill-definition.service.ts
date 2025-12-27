import { Injectable } from "@angular/core";
import { SkillDefinitionService } from "../../../../proxy/controllers/skill-definition.service";
import { SkillDefinitionDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class SkillDefinitionApiService {
    constructor(
     
        private SkillDefinitionService: SkillDefinitionService,
    ) { }

    getSkillDefinition(input: SearchInputDto): Observable<any> {
        return this.SkillDefinitionService.search(input);
    }

    deleteSkillDefinition(id: number): Observable<any> {
        return this.SkillDefinitionService.delete(id);
    }

    getDetailById(id: number): Observable<SkillDefinitionDto> {
        return this.SkillDefinitionService.getById(id).pipe(
            map((res: any) => res?.SkillDefinition as SkillDefinitionDto)
        );
    }

}
