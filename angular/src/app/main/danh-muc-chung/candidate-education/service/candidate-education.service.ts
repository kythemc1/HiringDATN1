import { Injectable } from "@angular/core";
import { CandidateEducationService } from "../../../../proxy/controllers/candidate-education.service";
import { CandidateEducationDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CandidateEducationApiService {
    constructor(
     
        private CandidateEducationService: CandidateEducationService,
    ) { }

    getCandidateEducation(input: SearchInputDto): Observable<any> {
        return this.CandidateEducationService.search(input);
    }

    deleteCandidateEducation(id: number): Observable<any> {
        return this.CandidateEducationService.delete(id);
    }

    getDetailById(id: number): Observable<CandidateEducationDto> {
        return this.CandidateEducationService.getById(id).pipe(
            map((res: any) => res?.CandidateEducation as CandidateEducationDto)
        );
    }

}
