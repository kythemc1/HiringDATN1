import { Injectable } from "@angular/core";
import { CandidateProjectService } from "../../../../proxy/controllers/candidate-project.service";
import { CandidateProjectDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CandidateProjectApiService {
    constructor(
     
        private CandidateProjectService: CandidateProjectService,
    ) { }

    getCandidateProject(input: SearchInputDto): Observable<any> {
        return this.CandidateProjectService.search(input);
    }

    deleteCandidateProject(id: number): Observable<any> {
        return this.CandidateProjectService.delete(id);
    }

    getDetailById(id: number): Observable<CandidateProjectDto> {
        return this.CandidateProjectService.getById(id).pipe(
            map((res: any) => res?.CandidateProject as CandidateProjectDto)
        );
    }

}
