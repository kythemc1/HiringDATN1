import { Injectable } from "@angular/core";
import { CandidateSkillService } from "../../../../proxy/controllers/candidate-skill.service";
import { CandidateSkillDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CandidateSkillApiService {
    constructor(
     
        private CandidateSkillService: CandidateSkillService,
    ) { }

    getCandidateSkill(input: SearchInputDto): Observable<any> {
        return this.CandidateSkillService.search(input);
    }

    deleteCandidateSkill(id: number): Observable<any> {
        return this.CandidateSkillService.delete(id);
    }

    getDetailById(id: number): Observable<CandidateSkillDto> {
        return this.CandidateSkillService.getById(id).pipe(
            map((res: any) => res?.CandidateSkill as CandidateSkillDto)
        );
    }

}
